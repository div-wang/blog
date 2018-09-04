# 使用Gogs Docker镜像配置git服务器

> 公司刚成立，急需要一台自己的git服务。之前使用Gitlab，不过搭建实在太过麻烦，在网上搜到Gogs有docker镜像，正好前两天学习了Docker，决定使用Docker+Gogs搞一搞。

<div class="nav-list">
### Docker系列文章
[Linux 安装 Docker](/2018/05/linux-install-docker-ce.html)
[使用Docker Gogs搭建git服务](/2018/05/build-git-server-using-gogs-docker-image.html)
[利用 Docker 运行 MongoDB](/2018/05/run-mongoDB-with-docker.html)
</div>
---

### 认识Docker

#### 简单概括：
Docker本身是个虚拟机工具，Docker也是一个镜像管理工具。
如果有安装虚拟机的经验的小伙伴可能会比较好理解，Docker的镜像其实就是类似于一个系统盘一样。虚拟机工具还原的是一个完整的系统，一个普通电脑运行2个虚拟系统就会卡成翔。而docker安装在linux上，它借用了linux系统内核，一些底层服务直接用调用linux内核完成，这样子的系统就可以把镜像压缩到足够小（因为只有引用层代码，没有系统底层代码）。而Docker镜像启动之后我们称之为容器，容器相应的无论大小还是内存都比传统虚拟机占优势。这样一个linux系统同时运行几十甚至几百个容器，还受Docker命令的统一管理。
所以使用Docker也就必须要熟悉它的命令行工具：
[Docker 命令大全](http://www.runoob.com/docker/docker-command-manual.html)

#### 如何安装
查看上篇文章：[Linux 安装 Docker](/2018/05/linux-install-docker-ce.html)

### 认识 Gogs
Gogs标榜：易安装、跨平台、轻量级。最最重要的是它开源。
Gogs介绍（官网）：[https://gogs.io/](https://gogs.io/)

### 安装Gogs
使用`docker pull`把镜像下载下来
```bash
docker pull gogs/gogs
```

### 启动Gogs容器
Docker本身使用了linux内核，所以一些linux的特性他也是具备的，比如挂载磁盘。  
Docker在常见一个容器服务时使用的是`docker run`命令，它的options就提供了一个 `-v | -volume` 的参数，就是用来挂在磁盘。  
这个有什么用呢，简单讲，你用Gogs镜像创建了一个容器，Gogs的数据都是存放在默认的data目录下，当我们那天升级或误删容器之后，我们的数据就无法找回了。  
而 `-v | -volume` 这个命令就可以将容器中的 `data` 目录挂载到linux主机上的其他任意目录，这样子就可以保证升级、误删、数据迁移我的数据都不会变。 

```bash
docker run --name=gogs -p 10022:22 -p 10080:3000 -v /data/gogs:/data gogs/gogs
```
这里还要注意：
`--name`：是用来给容器做别名了，理论上每个容器都有一个CONTAINER ID，这个是hash值，太长不好记，所以用哥别名。
`-p`：是映射端口，10022映射的是容器中的22端口 10080映射的是容器中的3000端口，我们配置gogs的时候会用到他们

### 启动 Gogs

```bash
docker start gogs
docker ps
docker ps //查看启动状态
```

### 访问Gogs进行配置
默认地址是： http://${ip}:10080   
使用阿里云的小伙伴注意：阿里云需要在安全组规则配置入站规则，即服务器端口10080， ssh端口10022

##### 数据库配置：
![图片](http://aliyunzixunbucket.oss-cn-beijing.aliyuncs.com/jpg/b4cde507db8c7703aa92ae93493b977b.jpg)

##### ssh与http配置：
![图片](http://aliyunzixunbucket.oss-cn-beijing.aliyuncs.com/jpg/8ef500f6bdf5cbfc49125c2c3842c167.jpg)

配置成功之后，自动登陆，就可以创建自己的私有仓库了！

### 参考资源

[阿里云图文教程（本次搭建参考此教程）](https://www.aliyun.com/jiaocheng/120285.html?spm=5176.100033.0.0.jZ1hRY)  
[阿里云Linux CentOS 7 Docker部署使用gogs搭建自己的git服务器](https://www.cnblogs.com/donaldtdz/p/8443516.html)  
[Gogs使用文档](https://gogs.io/docs)
