# 使用docker-compose快速构建wordpress

> 今天讲解一下超级简单方式搭建wordpress。使用 docker-compose 快速安装博客，顺带将nginx、mysql一起集成进去。

## 为什么使用docker-compose来构建

docker-composer 是 docker 的一种编排服务。就想本文的例子，你有一个wordpress镜像，一个mysql镜像，一个nginx镜像。如果没有docker-compose，那么每次启动的时候，你需要敲各个容器的启动参数，环境变量，容器命名，指定不同容器的链接参数等等一系列的操作，相当繁琐。而用了docker-composer之后，你就可以把这些命令一次性写在`docker-composer.yml`文件中，以后每次启动这一整个环境（含3个容器）的时候，你只要敲一个`docker-composer up`命令就ok了。

## 安装 docker

### centos 安装 docker

##### 更新源地址
> 众所周知的原因，官方源国内访问太慢，需要替换源地址，下面两个源地址任选一个即可
```bash
# 阿里云的源
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
```bash
# 清华大学的源
sudo yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```
##### 更新yum中的docker-ce为最新版本
```bash
sudo yum update #
```
##### 安装docker

```bash
sudo yum -y install docker-ce #安装 docker
sudo systemctl start docker #启动 docker 服务
docker version #查看 docker版本
```

##### 安装docker-compose

```bash
sudo yum install docker-compose #安装 docker-compose
sudo docker-compose version #查看版本
```
## 创建配置文件
#### 创建 nginx.conf
> 这是配合wordpress:php7.4-fpm-alpine镜像的nginx配置
```conf
server {
    listen 80;
    server_name www.domain.com;
    # 配置wordpress目录为根目录
    root /var/www/html;
    index index.php;
    # 配置日志目录
    access_log /var/log/nginx/wordpress-access.log;
    error_log /var/log/nginx/wordpress-error.log;
    location / {
        try_files $uri $uri/ /index.php?$args;
    }
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        # 配置访问转发到wordpress镜像9000接口
        fastcgi_pass wordpress:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
}
```

#### 创建 docker-compose.yml
```yml
version: '3.7' #指定本 yml 依从的 compose 哪个版本制定的。
services:
  nginx:
    image: nginx:latest #使用最新nginx镜像
    restart: always #容器总是重新启动
    ports:
      - '80:80' #将服务器8080端口映射到nginx镜像80端口
    volumes: #将服务器的nginx相关文件夹挂载到nginx镜像中
      - ./nginx:/etc/nginx/conf.d #配置
      - ./nginx/logs:/var/log/nginx #日志
      - ./html:/var/www/html #访问根目录，这个目录也是wordpress的根目录
    links: #链接到wordpress镜像，设置内网访问
      - wordpress
  db:
    image: mysql:5.7 #使用mysql:5.7镜像
    restart: always #容器总是重新启动
    ports:
      - "3308:3306" #将服务器3308端口映射到dbs镜像3306端口
    environment: #db镜像的环境变量
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    volumes: #将服务器的数据库文件夹挂载到db镜像中
      - ./db:/var/lib/mysql
  wordpress:
    image: wordpress:php7.4-fpm #使用wordpress:php7.4-fpm镜像，配合nginx使用
    restart: always #容器总是重新启动
    depends_on: #启动db镜像之后再启动wordpress镜像
      - db
    environment: #wordpress镜像的环境变量
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes: #将服务器的wordpress文件夹挂载到wordpress镜像中
      - ./html:/var/www/html
      - ./config/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
```

## 运行wordpress

#### 启动服务
```bash
docker-compose -f docker-compose.yml up -d #后台运行
```

#### 访问地址：
浏览器输入`IP:8080`或`www.domain.com`直接访问

#### 停止服务
```bash
docker-compose -f docker-compose.yml down #停止并删除服务
```

#### 其他命令
```bash
docker-compose ps #查看所有服务状态
docker-compose stop #停止所有容器
docker-compose stop nginx #停止指定容器（nginx）
docker-compose rm nginx #删除容器
```
