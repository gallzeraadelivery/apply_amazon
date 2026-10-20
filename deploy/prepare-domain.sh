#!/bin/sh
set -eu
domain=apply.gdapps.online
config=/opt/edge/nginx/active.conf
stamp=$(date -u +%Y%m%dT%H%M%SZ)
backup=/opt/edge/nginx/active.conf.before-apply-$stamp
test -f "$config"
command -v python3 >/dev/null
if grep -q 'server_name apply.gdapps.online;' "$config"; then
  echo 'Domain already configured; refusing to append duplicate virtual host.' >&2
  exit 1
fi
cp -p "$config" "$backup"
restore() {
  cat "$backup" > "$config"
  docker exec edge-nginx nginx -t && docker exec edge-nginx nginx -s reload
}
trap 'restore' HUP INT TERM
cat >> "$config" <<'NGINX'

# BEGIN apply.gdapps.online bootstrap
server {
    listen 80;
    server_name apply.gdapps.online;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { default_type application/json; return 503 '{"service":"gd-apply","stage":"infrastructure_setup"}'; }
}
# END apply.gdapps.online bootstrap
NGINX
if ! docker exec edge-nginx nginx -t; then restore; exit 1; fi
docker exec edge-nginx nginx -s reload
if ! (cd /opt/edge && docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d "$domain" --cert-name "$domain" --non-interactive --keep-until-expiring); then
  restore
  exit 1
fi
python3 - <<'PY'
from pathlib import Path
p = Path('/opt/edge/nginx/active.conf')
config = p.read_text()
start = config.index('# BEGIN apply.gdapps.online bootstrap')
end = config.index('# END apply.gdapps.online bootstrap', start) + len('# END apply.gdapps.online bootstrap')
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
    default_type application/json;
    add_header Cache-Control "no-store" always;
    add_header X-Content-Type-Options "nosniff" always;
    location = / {
        return 200 '{"service":"gd-apply","stage":"infrastructure_ready","applicationReady":false,"integrations":{"apex":"not_configured","amazon":"not_configured"}}';
    }
    location = /api/health {
        return 200 '{"status":"ok","component":"gateway","applicationReady":false}';
    }
    location /api/ {
        return 503 '{"error":"application_not_deployed"}';
    }
    location / { return 404 '{"error":"not_found"}'; }
}
# END apply.gdapps.online'''
# Write in place: Docker bind mounts the inode of this file.
with p.open('w') as f:
    f.write(config[:start] + block + config[end:])
PY
if ! docker exec edge-nginx nginx -t; then restore; exit 1; fi
docker exec edge-nginx nginx -s reload
sleep 2
if ! curl --fail --silent --show-error --max-time 20 "https://$domain/api/health"; then restore; exit 1; fi
printf '\nBackup: %s\n' "$backup"
trap - HUP INT TERM
