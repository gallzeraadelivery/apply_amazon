FROM node:22-alpine AS validation
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY public ./public
COPY test ./test
RUN node --check src/app.mjs && node --check src/apex.mjs && node --check public/app.mjs && node --disable-warning=ExperimentalWarning --test test/app.test.mjs

FROM node:22-alpine
ENV NODE_ENV=production PORT=8080 DB_PATH=/data/app.sqlite
WORKDIR /app
COPY --from=validation --chown=node:node /app/package.json ./
COPY --from=validation --chown=node:node /app/src ./src
COPY --from=validation --chown=node:node /app/public ./public
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD node -e "fetch('http://127.0.0.1:8080/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.mjs"]
