# NoSQL

## MongoDB Control Script (mongoctl) for Non-systemd Containers

This script provides a lightweight MongoDB management tool for environments **without** `systemd` (such as Docker containers running with `bash` as PID 1).
It allows you to easily **start**, **stop**, **restart**, **check status**, and **view logs** of MongoDB.

### 📦 Installation

Run the following once inside your container as `root`:

```bash
cat >/usr/local/bin/mongoctl <<EOF
#!/usr/bin/env bash
set -euo pipefail

# Fixed paths for MongoDB 3.6.3 in Holberton container
MONGOD_BIN="/opt/mongo363/bin/mongod"
MONGO_BIN="/opt/mongo363/bin/mongo"
DBPATH="/var/lib/mongodb363"
LOGDIR="/var/log/mongodb363"
LOGFILE="\$LOGDIR/mongod.log"
PORT=27017

usage() {
  cat <<USAGE
Usage: \$(basename "\$0") {start|stop|status|logs|restart}
USAGE
}

require_bins() {
  [[ -x "\$MONGOD_BIN" ]] || { echo "Missing \$MONGOD_BIN. Run setup script first."; exit 1; }
  [[ -x "\$MONGO_BIN"  ]] || { echo "Missing \$MONGO_BIN. Run setup script first."; exit 1; }
}

ensure_dirs() {
  mkdir -p "\$DBPATH" "\$LOGDIR"
  touch "\$LOGFILE"
  chmod 0755 "\$DBPATH"
  chmod 0644 "\$LOGFILE"
}

is_running() {
  ss -lntp 2>/dev/null | grep -q ":\$PORT " || pgrep -x mongod >/dev/null 2>&1
}

start() {
  require_bins
  ensure_dirs
  rm -rf "\${DBPATH:?}/"*

  if is_running; then
    echo "MongoDB already running on port \$PORT."
    return 0
  fi

  "\$MONGOD_BIN" \
    --dbpath "\$DBPATH" \
    --bind_ip_all \
    --fork \
    --logpath "\$LOGFILE"

  for i in {1..20}; do
    ss -lntp 2>/dev/null | grep -q ":\$PORT " && break
    sleep 0.5
  done

  "\$MONGO_BIN" --host 127.0.0.1 --port "\$PORT" --eval 'db.adminCommand({ ping: 1 })' >/dev/null
  echo "MongoDB 3.6.3 started on port \$PORT."
}

stop() {
  if ! is_running; then
    echo "MongoDB is not running."
    return 0
  fi
  if "\$MONGO_BIN" --quiet --host 127.0.0.1 --port "\$PORT" --eval 'db.getSiblingDB("admin").shutdownServer()' >/dev/null 2>&1; then
    :
  else
    pkill -x mongod || true
  fi
  for i in {1..20}; do
    is_running || { echo "MongoDB stopped."; return 0; }
    sleep 0.5
  done
  echo "MongoDB stop timed out."
  exit 1
}

status() {
  if is_running; then
    echo "running (port \$PORT)"
    ss -lntp 2>/dev/null | grep ":\$PORT " || true
  else
    echo "stopped"
  fi
}

logs() {
  ensure_dirs
  tail -n 100 -f "\$LOGFILE"
}

restart() {
  stop || true
  start
}

cmd="\${1:-}"; shift || true
case "\$cmd" in
  start)   start ;;
  stop)    stop ;;
  status)  status ;;
  logs)    logs ;;
  restart) restart ;;
  *)       usage; exit 1 ;;
esac
EOF

chmod +x /usr/local/bin/mongoctl


```

### 🚀 Usage

```bash
mongoctl start     # Start MongoDB
mongoctl status    # Check MongoDB status and listening ports
mongoctl logs      # View the last 100 log lines (follow mode)
mongoctl stop      # Stop MongoDB
mongoctl restart   # Restart MongoDB
```

## Installing `pymongo` for MongoDB 3.6.x

Run the following command in your environment or container:

```bash
pip3 install pymongo==3.12.3
```
