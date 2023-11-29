FROM node:16-alpine AS base

RUN apk --no-cache add curl
RUN npm i -g pnpm

WORKDIR /source

# pnpm fetch does require only lockfile
COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . .
RUN pnpm install -r --offline

### These steps are only performed in a DEVELOPMENT environment:
FROM base AS dev

ENTRYPOINT [ "pnpm", "dev" ]

### These steps are only performed in a PRODUCTION environment:
FROM base AS build

RUN pnpm build

FROM httpd:2.4 AS prod

RUN apt update && apt install -y curl

COPY --from=build /source/dist /usr/local/apache2/htdocs/