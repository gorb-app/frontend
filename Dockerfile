FROM node:alpine

COPY ./.output /web

COPY entrypoint.sh /usr/bin/entrypoint.sh

RUN useradd --create-home --home-dir /web gorb

USER gorb

ENTRYPOINT ["/usr/bin/entrypoint.sh"]