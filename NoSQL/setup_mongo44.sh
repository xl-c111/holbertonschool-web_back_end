#!/usr/bin/env bash
set -euo pipefail

# Ensure the legacy client is used
rm -f /usr/local/bin/mongo || true
hash -r || true
if ! command -v mongo >/dev/null || ! mongo --version 2>&1 | grep -q 'v3.6.3'; then
  cp /opt/mongo363/bin/mongo /usr/bin/mongo
  chmod +x /usr/bin/mongo
fi

# Prepare dedicated dbpath/log for MongoDB 3.6
mkdir -p /var/lib/mongodb363 /var/log/mongodb363
touch /var/log/mongodb363/mongod.log
chmod 0755 /var/lib/mongodb363
chmod 0644 /var/log/mongodb363/mongod.log

# Start mongod 3.6 if not already running on 27017
if ! ss -lntp 2>/dev/null | grep -q ':27017 '; then
  pkill -x mongod || true
  /opt/mongo363/bin/mongod \
    --dbpath /var/lib/mongodb363 \
    --bind_ip_all \
    --fork \
    --logpath /var/log/mongodb363/mongod.log
  for i in {1..20}; do
    ss -lntp 2>/dev/null | grep -q ':27017 ' && break
    sleep 0.5
  done
fi

# Final sanity check
mongo --version | grep 'v3.6.3' >/dev/null
mongo --host 127.0.0.1 --port 27017 --eval 'db.adminCommand({ ping: 1 })' >/dev/null
echo "mongo 3.6.3 ready on 27017"
