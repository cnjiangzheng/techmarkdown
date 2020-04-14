###切换数据库
```mongo
use admin
```
###创建用户并赋予初始权限,所有数据库用户管理员
```mongo
db.createUser({user: "admin",pwd: "admin",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
```
###赋予所有数据库数据管理员角色
```mongo
db.grantRolesToUser("admin",[{role:"dbAdminAnyDatabase", db:"admin"}])
db.grantRolesToUser("admin",[{role:"root", db:"admin"}])
db.grantRolesToUser("admin",[{role:"readAnyDatabase", db:"admin"}])
db.grantRolesToUser("admin",[{role:"readWriteAnyDatabase", db:"admin"}])


db.Account.insert({AccountID:12345678901,UserName:"1",Password:"1",Age:1,Email:"1",RegisterDate:"2011-06-09 16:36:95"})
db.Account.update({"AccountID":12345678901},{"$set":{"Age":2,"Email":"2"}})
db.Account.find({"AccountID":12345678901})
db.Account.remove({"AccountID":12345678901})

db.changeUserPassword('admin','123456')
```

###Built-In Roles（内置角色）：
1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root  
// 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
7. 内部角色：__system
###具体角色
Read：允许用户读取指定数据库
readWrite：允许用户读写指定数据库
dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
root：只在admin数据库中可用。超级账号，超级权限

