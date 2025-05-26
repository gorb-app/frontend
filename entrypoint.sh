#!/bin/sh

if [ ! -d "/web/logs" ]; then
    mkdir /web/logs
fi

rotate_log() {
  LOGFILE="$1"
  BASENAME=$(basename "$LOGFILE" .log)
  DIRNAME=$(dirname "$LOGFILE")

  if [ -f "$LOGFILE" ]; then
    # Find the next available number
    i=1
    while [ -f "$DIRNAME/${BASENAME}.${i}.log.gz" ]; do
      i=$((i + 1))
    done

    gzip "$LOGFILE"
    mv "${LOGFILE}.gz" "$DIRNAME/${BASENAME}.${i}.log.gz"
  fi
}

rotate_log "/web/logs/frontend.log"

/usr/local/bin/node /web/server/index.mjs 2>&1 | tee /gorb/logs/frontend.log
