# Linux 安装 Docker

> 很早就听说了docker，以前一直把docker理解为单纯的虚拟机，最近在部署服务的时候深入了解了下docker，决定写一个系列文章作为学习记录。

<div class="nav-list">
### Docker系列文章
[Linux 安装 Docker](/2018/05/linux-install-docker-ce.html)
[使用Docker Gogs搭建git服务](/2018/05/build-git-server-using-gogs-docker-image.html)
[利用 Docker 运行 MongoDB](/2018/05/run-mongoDB-with-docker.html)
</div>
---

## debain如何安装docker

一如既往的使用debain + apt-get方式安装docker，这样做安装方便，容易升级，并随时跟进最新版本，也方便版本回滚。

### 安装软件包让apt支持HTTPS
```bash
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common
```

### 添加docker官方GPG KEY
```bash
// $(. /etc/os-release;echo"$ID") 获取Linux发行版本
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release;echo"$ID")/gpg | sudo apt-key add -
```

### 指纹验证
```bash
// 这里是Debian 9.0
sudo apt-key fingerprint 0EBFCD88
```
是否输出：`9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88`

### 添加apt镜像仓库

#### x86_64:
```bash
  sudo add-apt-repository \ "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release;echo"$ID") \ $(lsb_release -cs) \ stable"
```
#### armhf:
```bash
  echo "deb [arch=armhf] https://download.docker.com/linux/$(. /etc/os-release;echo"$ID")\ $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list
```

### 安装docker CE
```bash
sudo apt-get update
sudo apt-get install docker-ce
```
#### Docker 从 17.03版本之后分为 CE（Community Edition） 和 EE（Enterprise Edition））
Docker以后会以CE（Community Edition）和EE（Enterprise Edition）的形式发布。其中，CE版本每个月发布一次，也就是说，随后的版本就是17.03、17.04、17.05等，而EE的版本是没三个月发布一次，对应的就是17.03、17.06等。对于发布的每个EE版本，Docker官网都会提供一年的技术支持。 

## contentOS 如何安装docker

因为最新的代码部署到了content os服务器上，所以这里也提供了yum的安装步骤。

### yum 默认源安装
Docker 软件包和依赖包已经包含在默认的 CentOS-Extras 软件源里，版本是1.13.1，不是最新版本。安装命令如下：
```bash
yum -y install docker-io
```

### docker官方推荐安装
使用官方推荐安装方式可以更新到最新docker版本

#### 卸载老版本: 
```bash 
  sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```
#### 安装依赖包
`yum-utils`提供`yum-config-manager`实用程序，devicemapper-storage-driver驱动程序需要`device-mapper-persistent-data`和`lvm2`
```bash
  sudo yum install -y yum-utils \
                      device-mapper-persistent-data \
                      lvm2
```

#### 更新docker稳定版本库
```bash
  sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

#### 也可以开启或关闭最新测试版
```bash
  # 开启最新测试版本库
  sudo yum-config-manager --enable docker-ce-test
  # 关闭最新测试版本库
  sudo yum-config-manager --disable docker-ce-test
```

#### 安装最新版本的Docker CE
```bash 
  sudo yum install docker-ce
```
