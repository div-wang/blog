# 利用acme.sh实现网站https

> **acme.sh** 实现了 `acme` 协议, 可以从 letsencrypt 生成免费的证书, 配置和管理相当方便.

<div class="nav-list">
### 目录
[安装 **acme.sh**](#1-acme-sh-)
[生成证书](#2-)
[copy/安装 证书](#3-copy-)
[更新](#4-)
[参考](#5-)
</div>
---

## 1. 安装 **acme.sh**

安装很简单, 一条命令搞定:
```
curl  https://get.acme.sh | sh
```

sh 文件将 **acme.sh** 安装目录在 `~/.acme.sh/` 下, 创建 一个 `acme.sh=~/.acme.sh/acme.sh` 的 alias, 方便你的使用, 再自动为你创建一个 job,  每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.

** 所有的修改都限制在安装目录中: `~/.acme.sh/`, 安装不会写入其他文件**

## 2. 生成证书

**acme.sh** 实现了 **acme** 协议支持的所有验证协议, 一般有两种方式验证: http 和 dns 验证.

### 2-1. http 方式.

http 方式也根据使用服务不同为以下几种

#### 2-1-1. 正常 http 验证

只需要指定域名, 并指定域名所在的网站根目录. **acme.sh** 会全自动的生成验证文件, 并放到网站的根目录, 自动完成验证会删除验证文件.

```
acme.sh  --issue  -d mydomain.com -d www.mydomain.com  --webroot  /home/wwwroot/mydomain.com/
```

#### 2-1-2. **apache**服务器验证

如果你用的 **apache**服务器, **acme.sh** 还可以智能的从 **apache**的配置中自动完成验证, 你不需要指定网站根目录:
```
sudo acme.sh --issue  -d mydomain.com   --apache
```

#### 2-1-3. **nginx**服务器验证

如果你用的 **nginx**服务器, 或者反代, **acme.sh** 还可以智能的从 **nginx**的配置中自动完成验证, 你不需要指定网站根目录:
```
sudo acme.sh --issue  -d mydomain.com   --nginx
```

**注意, 无论是 apache 还是 nginx 模式, acme.sh会生成一个 config 文件, 并备份你的 nginx.config, 所以这里一般会用到 sudo, 验证完成acme.sh会自动回复你的 nginx.config**

#### 2-1-4.独立服务模式 **--standalone**

在 **acme.sh** 安装过程中会有一个 warning 提示

```
[Tue Nov  7 09:17:19 UTC 2017] It is recommended to install socat first.
[Tue Nov  7 09:17:19 UTC 2017] We use socat for standalone server if you use standalone mode.
[Tue Nov  7 09:17:19 UTC 2017] If you don't use standalone mode, just ignore this warning.
```

`-- standalone`是用来启动独立服务端的, 也就是你没有任何web 服务, **acme.sh** 可以启动一个webserver, 监听 **80** 端口, 完成验证

```
acme.sh --issue --standalone -d mydomain.com
```

### 2-2.DNS 方式

DNS 方式就是在域名上添加一条 txt 解析记录, 验证域名所有权, 分为自动和手动.

#### 2-2-1.自动 DNS 解析
DNS 方式的真正强大之处在于可以使用域名解析商提供的 api 自动添加 txt 记录完成验证.

**acme.sh** 目前支持 30 多种解析商的自动集成.

详细的 api 用法: [How to use DNS API](https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md)

#### 2-2-2.手动 DNS 解析

执行以下命令, **acme.sh** 会生成相应的解析记录显示出来, 你只需要在你的域名管理面板中添加这条 txt 记录即可.

```
acme.sh --issue --dns -d mydomain.com
```

等待解析完成之后, 使用`--renew`命令重新生成证书:

```
acme.sh --renew -d mydomain.com
```

### 2-3. 多级子域名支持

**acme.sh**对于多个域名或子域名的支持相当方便, 在执行命令后加上你所有的域名, 例如:

```
acme.sh --issue --dns dns_ali -d mydomain.com -d *.mydomain.com
```

## 3. copy/安装 证书

默认生成的证书都放在安装目录下: `~/.acme.sh/`,  官方不建议直接使用此目录下的文件, 推荐使用 `--installcert` 命令, 指定目标位置, 然后自己配置目录:

#### Apache example:
```
acme.sh --install-cert -d example.com \
--cert-file      /path/to/certfile/in/apache/cert.pem  \
--key-file       /path/to/keyfile/in/apache/key.pem  \
--fullchain-file /path/to/fullchain/certfile/apache/fullchain.pem \
--reloadcmd     "service apache2 force-reload"
```

#### Nginx example:
```
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

这里指定的所有参数都会被自动记录下来, 并在将来证书自动更新以后, 被再次自动调用.

详细参数请参考: [Install the issued cert to Apache/Nginx etc.](https://github.com/Neilpang/acme.sh#3-install-the-issued-cert-to-apachenginx-etc)


## 4. 更新

### 4-1. 证书更新

目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间, 不过都是自动的, 你不用关心.

如果您想强制更新，执行一下命令
```
# RSA
$ acme.sh --renew -d example.com --force

# ECC
acme.sh --renew -d example.com --force --ecc
```

### 4-2. acme.sh 更新

升级 acme.sh 到最新版 :
```
acme.sh --upgrade
```

开启自动升级:

```
acme.sh  --upgrade  --auto-upgrade
```

关闭自动更新:

```
acme.sh --upgrade  --auto-upgrade  0
```

更多命令，请在终端执行
```
acme.sh
```

## 参考
[中文说明](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

[Wiki Home](https://github.com/Neilpang/acme.sh/wiki)

[An ACME Shell script: acme.sh](https://github.com/Neilpang/acme.sh)

[使用acme.sh脚本的DNS API方式申请及更新let's encrypt证书](http://www.racksam.com/2016/12/26/centos-nginx-setup-lets-encrypt-with-acme-sh/)

