# 利用 Docker 运行 MongoDB

> 在服务器上安装MongoDB很是繁琐，而通过 Docker 运行 MongoDB很是方便，数据迁移也变得更加简单，日常的运维和使用与本地安装基本没有区别。

<div class="nav-list">
### Docker系列文章
[Linux 安装 Docker](/2018/05/linux-install-docker-ce.html)
[使用Docker Gogs搭建git服务](/2018/05/build-git-server-using-gogs-docker-image.html)
[利用 Docker 运行 MongoDB](/2018/05/run-mongoDB-with-docker.html)
</div>
---

### 准备工作
安装docker，参考文章[Linux 安装 Docker](/2018/05/linux-install-docker-ce.html)

### 查找官方镜像
查找Docker Hub上的 mongo 镜像
```bash
sudo docker search mongo
NAME                                DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mongo                               MongoDB document databases provide high avai…   4916                [OK]
mongo-express                       Web-based MongoDB admin interface, written w…   288                 [OK]
tutum/mongodb                       MongoDB Docker image – listens in port 27017…   224                                     [OK]
mvertes/alpine-mongo                light MongoDB container                         79                                      [OK]
mongoclient/mongoclient             Official docker image for Mongoclient, featu…   54                                      [OK]
bitnami/mongodb                     Bitnami MongoDB Docker Image                    46                                      [OK]
frodenas/mongodb                    A Docker Image for MongoDB                      17                                      [OK]
mongooseim/mongooseim               Small docker image for MongooseIM - robust a…   16
mongooseim/mongooseim-docker        MongooseIM server the latest stable version     11                                      [OK]
cvallance/mongo-k8s-sidecar         Kubernetes side car to setup and maintain a …   8                                       [OK]
centos/mongodb-26-centos7           MongoDB NoSQL database server                   5
centos/mongodb-32-centos7           MongoDB NoSQL database server                   5
istepanov/mongodump                 Docker image with mongodump running as a cro…   5                                       [OK]
eses/mongodb_exporter               mongodb exporter for prometheus                 4                                       [OK]
khezen/mongo                        MongoDB Docker image supporting RocksDB stor…   4                                       [OK]
neowaylabs/mongodb-mms-agent        This Docker image with MongoDB Monitoring Ag…   2                                       [OK]
centos/mongodb-36-centos7           MongoDB NoSQL database server                   2
centos/mongodb-34-centos7           MongoDB NoSQL database server                   1
openshift/mongodb-24-centos7        DEPRECATED: A Centos7 based MongoDB v2.4 ima…   1
ekesken/mongo                       docker image for mongo that is configurable …   1                                       [OK]
webhippie/mongodb                   Docker images for mongodb                       1                                       [OK]
circleci/mongo                      CircleCI images for MongoDB                     1                                       [OK]
amd64/mongo                         MongoDB document databases provide high avai…   0
quilt/mongo                         MongoDB container for quilt.io                  0                                       [OK]
ansibleplaybookbundle/mongodb-apb   An APB to deploy MongoDB.                       0                                       [OK]
```
这里我们拉取官方的最新镜像
```bash
docker pull mongo
```
等待下载完成后，我们就可以在本地镜像列表里查到REPOSITORY为mongo的镜像。
```bash
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mongo               latest              a41c82c0998a        11 days ago         380MB
```
### 运行 mongo 镜像
[mongo镜像官方文档](https://hub.docker.com/_/mongo/)
```bash
docker run --name mongo -p 27017:27017 -v /data/db:/data/db -d mongo --auth
```
`—-name` 指定镜像的名字，如果不指定会使用 Docker 镜像 ID。
`-p 27018:27017` 官方的 mongo 镜像默认端口是27017，我们将它映射到主机的端口上27018。 27018端口可自定义，但是不能是在使用的接口。
`-v /data/db:/data/db` -v 是挂载路径，将 mongo 镜像里的目录挂载到本地目录，mongo 镜像默认目录是/data/db。
`-d` 在后台运行。
`—auth` 以 auth 模式运行 mongo。

然后执行一下 docker ps 确认一下库已经正常运行起来。
```bash
CONTAINER ID    IMAGE      COMMAND                  CREATED        STATUS        PORTS                      NAMES
20e0be4e4a7e    mongo      "docker-entrypoint.s…"   7 days ago     Up 7 days     0.0.0.0:20188->27017/tcp   mongo
```

### 连接 mongo 镜像
使用 `docker exec` 命令连接 mongo 镜像
```bash
docker exec -it mongo /bin/bash
```
更多的请看文档-[Docker exec 命令](http://www.runoob.com/docker/docker-exec-command.html)

### 创建用户和数据库 
1、 切换到admin数据库
```bash
use admin
```

2、创建管理员账户
```bash
db.createUser({ user: 'admin', pwd: 'admin_password', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
```

3、为创建的管理员账户进行授权
```bash
db.auth("admin","admin_password");
```

4、切换到指定数据库（如不存在会自动创建，默认是没有数据的，执行`show dbs`并不会显示出来）
```bash
use test
```

5、创建test库下的用户
```bash
db.createUser({ user: 'test', pwd: 'test_password', roles: [{ role: "readWrite", db: "test" }] });
```

### 链接数据库 

shell链接数据库:
```bash
mongo 127.0.0.1:27018/test -u test -p test_password
```

标准 URI 连接语法：
```bash
mongodb://test:test_password@127.0.0.1:27018/test
```

### 参考资源

[Docker 安装 MongoDB](http://www.runoob.com/docker/docker-install-mongodb.html)  
[MongoDB - 连接](http://www.runoob.com/mongodb/mongodb-connections.html)  
[mongo镜像官方文档](https://hub.docker.com/_/mongo/)
