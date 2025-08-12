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

# Function to check if MongoDB is running
is_running() { pgrep -x mongod >/dev/null 2>&1; }

case "${1:-}" in
  start)
    if is_running; then
      echo "MongoDB is already running."
      exit 0
    fi
    mkdir -p "$DBPATH" "$LOGDIR"
    mongod --fork --dbpath "$DBPATH" --logpath "$LOGFILE" --bind_ip_all
    echo "MongoDB started."
    ;;
  stop)
    if ! is_running; then
      echo "MongoDB not running."
      exit 0
    fi
    # Attempt to gracefully shut down; suppress output
    mongosh --quiet --eval "db.getSiblingDB('admin').shutdownServer()" > /dev/null 2>&1 || true
    # Wait up to 10 seconds for process to stop
    for _ in $(seq 1 20); do
      if ! is_running; then
        echo "MongoDB stopped."
        exit 0
      fi
      sleep 0.5
    done
    echo "Timed out waiting for MongoDB to stop." >&2
    exit 1
    ;;
  status)
    if is_running; then
      echo "running"
      exit 0
    else
      echo "stopped"
      exit 3
    fi
    ;;
  *)
    echo "Usage: mongoctl {start|stop|status}"
    exit 1
    ;;
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
