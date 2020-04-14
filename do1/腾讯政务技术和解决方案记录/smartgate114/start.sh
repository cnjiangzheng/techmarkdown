#!/bin/bash
ulimit -SHn 65536
sysctl net.ipv4.tcp_sack=1
sysctl net.ipv4.tcp_syncookies=1
sysctl net.ipv4.tcp_timestamps=1
sysctl net.ipv4.tcp_tw_recycle=0
sysctl net.ipv4.tcp_tw_reuse=1
sysctl net.ipv4.tcp_fastopen=3
export NODE_NO_WARNINGS=1
"/data/solution/smartgate/bin/node" "/data/solution/smartgate/bin/smartgate.js" "$@"
