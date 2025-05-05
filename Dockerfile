FROM node:alpine

COPY ./.output /web

COPY entrypoint.sh /usr/bin/entrypoint.sh

RUN busybox adduser -D -h /web gorb

USER gorb

ENTRYPOINT ["/usr/bin/entrypoint.sh"]