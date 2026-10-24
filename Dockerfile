FROM node:22-alpine AS validation
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund
COPY src ./src
COPY public ./public
COPY test ./test
COPY deploy/create-dev-env.mjs ./deploy/create-dev-env.mjs
RUN npm run check && node --disable-warning=ExperimentalWarning --test test/*.test.mjs

FROM node:22-alpine
ENV NODE_ENV=production PORT=8080 DB_PATH=/data/app.sqlite
WORKDIR /app
RUN apk add --no-cache tesseract-ocr tesseract-ocr-data-eng
COPY --from=validation --chown=node:node /app/package.json ./
COPY --from=validation --chown=node:node /app/package-lock.json ./
COPY --from=validation --chown=node:node /app/node_modules ./node_modules
COPY --from=validation --chown=node:node /app/src ./src
COPY --from=validation --chown=node:node /app/public ./public
RUN mkdir /data && chown node:node /data
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD node -e "fetch('http://127.0.0.1:8080/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.mjs"]
