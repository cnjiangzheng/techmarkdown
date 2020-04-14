###1查看硬盘

lsblk

fdisk -l

fdisk /dev/vdb

Command (m for help):n回车

Select (default p): 回车
Using default response p
Partition number (1-4, default 1): 回车
First sector (2048-209715199, default 2048):回车
Last sector, +sectors or +size{K,M,G} (2048-209715199, default 209715199): 回车

Command (m for help):t回车

Hex code (type L to list all codes): 8e
#保存并退出
Command (m for help):w回车

fdisk -l

pvcreate /dev/vdb1 

pvdisplay

vgcreate vg01 /dev/vdb1

lvcreate -l 100%FREE -n lvdata vg01
#用mkfs.ext4格式化
mkfs.ext4 /dev/vg01/lvdata
#创建/data目录
mkdir /data
## rm需谨慎
#rm -rf /data/*
#将/dev/vg01/lvdata挂载到/data
mount /dev/vg01/lvdata /data
#将mount /dev/vg01/lvdata /data写入自动加载（不要轻易修改fstab，掉盘后很可能导致系统起不来）
echo "mount /dev/vg01/lvdata /data" >> /etc/rc.local


###2.扩容
把分区vda剩余空间创建分区并改为LVM格式
fdisk /dev/vda

p查看分区 n创建分区 t改分区类型（8e为LVM） m显示帮助 w保存退出

reboot重启生效

选择分区创建为PV
pvcreate /dev/vda3    #vda3为分区名

选择PV加入到VG
vgextend vgname /dev/vda3

扩容LV
lvextend -L +14G /dev/VolGroup/LVRoot

重新调整分区大小
resize2fs /dev/vgname/lvname
