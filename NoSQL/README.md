# NoSQL

## MongoDB Control Script (mongoctl) for Non-systemd Containers

This script provides a lightweight MongoDB management tool for environments **without** `systemd` (such as Docker containers running with `bash` as PID 1).
It allows you to easily **start**, **stop**, **restart**, **check status**, and **view logs** of MongoDB.

### 📦 Installation

Run the following once inside your container as `root`:

```bash
cat >/usr/local/bin/mongoctl <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
DBPATH="/data/db"
LOGDIR="/var/log/mongodb"
LOGFILE="$LOGDIR/mongod.log"
cmd="${1:-}"
case "$cmd" in
  start)
    mkdir -p "$DBPATH" "$LOGDIR"
    pgrep -x mongod >/dev/null || mongod --fork --dbpath "$DBPATH" --logpath "$LOGFILE" --bind_ip_all
    echo "MongoDB started."
    ;;
  stop)
    pgrep -x mongod >/dev/null && mongosh --quiet --eval 'use admin; db.shutdownServer()' || echo "MongoDB not running."
    ;;
  status)
    pgrep -x mongod >/dev/null && echo "running" || echo "stopped"
    ;;
  *) echo "Usage: mongoctl {start|stop|status}"; exit 1;;
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

### 🔍 Connecting & Verifying

After starting MongoDB, connect using the MongoDB Shell:

```bash
mongosh          # Connect to localhost:27017
show dbs         # List databases
```
