#!/bin/bash
echo "n
p



t
8e
w
" |fdisk /dev/xvde

pvcreate /dev/xvde1 

pvdisplay

vgcreate vg01 /dev/xvde1

lvcreate -l 100%FREE -n lvdata vg01
mkfs.ext4 /dev/vg01/lvdata
mkdir /data
mount /dev/vg01/lvdata /data
echo "mount /dev/vg01/lvdata /data" >> /etc/rc.local