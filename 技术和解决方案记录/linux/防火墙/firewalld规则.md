#安全区域所有端口均能连接,--permanent表示永久生效
firewall-cmd --permanent --zone=trusted --change-source=172.10.3.233
#设置默认访问区域时，不需要设置--zone，下面是加入的一个示例
firewall-cmd --add-port=1420/tcp
#删除已添加的条目的示例，刚好这个是一个段的添加
firewall-cmd --remove-port=0-100/udp
#设置部分低权限的区域，例如仅能够SSH连接
firewall-cmd --zone=external --change-source=172.0.0.0/8
firewall-cmd --zone=external --remove-source=172.0.0.0/8
#禁用外部连接
firewall-cmd --zone=block --change-source=0.0.0.0/0
#检查当前配置
firewall-cmd --list-all-zones
#将当前配置固化，永久保存
firewall-cmd --runtime-to-permanent


1、firewalld的基本使用
启动： systemctl start firewalld
查看状态： systemctl status firewalld 
禁用，禁止开机启动： systemctl disable firewalld
停止运行： systemctl stop firewalld
 
 

2.配置firewalld-cmd
查看版本： firewall-cmd --version
查看帮助： firewall-cmd --help
显示状态： firewall-cmd --state
查看所有打开的端口： firewall-cmd --zone=public --list-ports
更新防火墙规则： firewall-cmd --reload
更新防火墙规则，重启服务： firewall-cmd --completely-reload
查看已激活的Zone信息:  firewall-cmd --get-active-zones
查看指定接口所属区域： firewall-cmd --get-zone-of-interface=eth0
拒绝所有包：firewall-cmd --panic-on
取消拒绝状态： firewall-cmd --panic-off
查看是否拒绝： firewall-cmd --query-panic
 
3.信任级别，通过Zone的值指定
drop: 丢弃所有进入的包，而不给出任何响应 
block: 拒绝所有外部发起的连接，允许内部发起的连接 
public: 允许指定的进入连接 
external: 同上，对伪装的进入连接，一般用于路由转发 
dmz: 允许受限制的进入连接 
work: 允许受信任的计算机被限制的进入连接，类似 workgroup 
home: 同上，类似 homegroup 
internal: 同上，范围针对所有互联网用户 
trusted: 信任所有连接

4.firewall开启和关闭端口
以下都是指在public的zone下的操作，不同的Zone只要改变Zone后面的值就可以
添加：
firewall-cmd --zone=public --add-port=80/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）
重新载入：
firewall-cmd --reload
查看：
firewall-cmd --zone=public --query-port=80/tcp
删除：
firewall-cmd --zone=public --remove-port=80/tcp --permanent
 
5.管理服务
以smtp服务为例， 添加到work zone
添加：
firewall-cmd --zone=work --add-service=smtp
查看：
firewall-cmd --zone=work --query-service=smtp
删除：
firewall-cmd --zone=work --remove-service=smtp
 
5.配置 IP 地址伪装
查看：
firewall-cmd --zone=external --query-masquerade
打开：
firewall-cmd --zone=external --add-masquerade
关闭：
firewall-cmd --zone=external --remove-masquerade
 
6.端口转发
打开端口转发，首先需要打开IP地址伪装
　　firewall-cmd --zone=external --add-masquerade
 
转发 tcp 22 端口至 3753：
firewall-cmd --zone=external --add-forward-port=22:porto=tcp:toport=3753
转发端口数据至另一个IP的相同端口：
firewall-cmd --zone=external --add-forward-port=22:porto=tcp:toaddr=192.168.1.112
转发端口数据至另一个IP的 3753 端口：
firewall-cmd --zone=external --add-forward-port=22:porto=tcp:：toport=3753:toaddr=192.168.1.112
 
6.systemctl是CentOS7的服务管理工具中主要的工具，它融合之前service和chkconfig的功能于一体。
启动一个服务：systemctl start firewalld.service
关闭一个服务：systemctl stop firewalld.service
重启一个服务：systemctl restart firewalld.service
显示一个服务的状态：systemctl status firewalld.service
在开机时启用一个服务：systemctl enable firewalld.service
在开机时禁用一个服务：systemctl disable firewalld.service
查看服务是否开机启动：systemctl is-enabled firewalld.service
查看已启动的服务列表：systemctl list-unit-files|grep enabled
查看启动失败的服务列表：systemctl --failed