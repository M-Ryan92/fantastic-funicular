FROM node:19.7.0-alpine as client

ENV NODE_ENV=production TERM=xterm

WORKDIR /opt/app

COPY ./client/package.json .
COPY ./client/tsconfig.json .
COPY ../client/yarn.lock .
COPY ./client/public ./public
COPY ./client/src ./src

RUN yarn && yarn build:server

FROM python:3.11.4-alpine

EXPOSE 5000

WORKDIR /opt/app/

COPY ./server/example.env ./env
COPY ./server/pyproject.toml .
COPY ./server/setup.cfg .
COPY ./server/poetry.lock .
COPY ./server/src ./src

COPY --from=client ./opt/app/build ./src/static

RUN pip install poetry
RUN poetry install