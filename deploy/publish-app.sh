#!/bin/sh
set -eu
cd /opt/gd-apply
test -f .env
chmod 600 .env
docker compose config --quiet
docker compose build
docker compose up -d
healthy=false
for attempt in $(seq 1 30); do
  if docker exec gd-apply-app node -e "fetch('http://127.0.0.1:8080/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"; then healthy=true; break; fi
  sleep 2
done
test "$healthy" = true
config=/opt/edge/nginx/active.conf
backup=/opt/edge/nginx/active.conf.before-apply-app-$(date -u +%Y%m%dT%H%M%SZ)
cp -p "$config" "$backup"
python3 - <<'PY'
from pathlib import Path
p = Path('/opt/edge/nginx/active.conf')
config = p.read_text()
start = config.index('# BEGIN apply.gdapps.online\n')
end = config.index('# END apply.gdapps.online', start) + len('# END apply.gdapps.online')
block = '''# BEGIN apply.gdapps.online
server {
    listen 80;
    server_name apply.gdapps.online;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://$host$request_uri; }
}
server {
    listen 443 ssl;
    http2 on;
    server_name apply.gdapps.online;
    ssl_certificate /etc/letsencrypt/live/apply.gdapps.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/apply.gdapps.online/privkey.pem;
    client_max_body_size 10m;
    location / {
        proxy_pass http://gd-apply-app:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 10s;
        proxy_read_timeout 45s;
        proxy_send_timeout 45s;
    }
}
# END apply.gdapps.online'''
with p.open('w') as f:
    f.write(config[:start] + block + config[end:])
PY
if ! docker exec edge-nginx nginx -t; then
  cat "$backup" > "$config"
  exit 1
fi
docker exec edge-nginx nginx -s reload
sleep 2
if ! curl --fail --silent --show-error --max-time 20 https://apply.gdapps.online/api/health; then
  cat "$backup" > "$config"
  docker exec edge-nginx nginx -t
  docker exec edge-nginx nginx -s reload
  exit 1
fi
printf '\nNginx backup: %s\n' "$backup"
