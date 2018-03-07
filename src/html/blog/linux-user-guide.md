# linux下用户操作指南

> 最近捋到腾讯云2000代金券羊毛，买了腾讯云的香港主机，安装了 Debian 系统，发现Linux用户要自己配置，就写一篇文章记录下学习的用户命令以及Debian新建用户不能sudo的问题解决方法

## 组操作

### 1，创建组
增加一个test组
```bash
groupadd  testGroup
```
### 2，修改组
将testGroup组的重命名成testGroup2
```bash
groupmod -n testGroup2 testGroup
```
### 3，删除组

```bash
groupdel testGroup2
```

### 4，查看组

+ 查看当前登录用户所在的组 `groups`

+ 查看所有组 `cat /etc/group`

+ 有的linux系统没有/etc/group文件的，这个时候看下面的这个方法
```bash
cat /etc/passwd |awk -F [:] '{print $4}' |sort|uniq | getent group |awk -F [:] '{print $1}'
```
这里用到一个命令是getent,可以通过组ID来查找组信息,如果这个命令没有的话,那就很难查找,系统中所有的组了.

## 用户操作

### 1、增加用户

+ 查看useradd帮助信息
```bash
div-mac:~ div$ useradd --help
Usage: useradd [options] LOGIN
Options:
 -b, --base-dir BASE_DIR       设置基本路径作为用户的登录目录
 -c, --comment COMMENT         对用户的注释
 -d, --home-dir HOME_DIR       设置用户的登录目录
 -D, --defaults                改变设置
 -e, --expiredate EXPIRE_DATE  设置用户的有效期
 -f, --inactive INACTIVE       用户过期后，让密码无效
 -g, --gid GROUP               使用户只属于某个组
 -G, --groups GROUPS           使用户加入某个组
 -h, --help                    帮助
 -k, --skel SKEL_DIR           指定其他的skel目录
 -K, --key KEY=VALUE           覆盖 /etc/login.defs 配置文件
 -m, --create-home             自动创建登录目录
 -l,                           不把用户加入到lastlog文件中
 -M,                           不自动创建登录目录
 -r,                           建立系统账号
 -o, --non-unique              允许用户拥有相同的UID
 -p, --password PASSWORD       为新用户使用加密密码
 -s, --shell SHELL             登录时候的shell
 -u, --uid UID                 为新用户指定一个UID
 -Z, --selinux-user SEUSER     use a specific SEUSER for the SELinux user mapping
 ```

+ 增加用户test，有一点要注意的，useradd增加一个用户后，不要忘了给他设置密码，不然不能登录的。
```bash
useradd -d '/home/test' -s '/bin/bash' -g testGroup test
```

### 2、修改用户
+ 将test用户的登录目录改成/home/test，并加入testGroup组，注意这里是大G。
```bash
usermod -d '/home/test' -s '/bin/bash' -g testGroup test
```
+ 将用户test加入到testGroup组
```bash
gpasswd -a test testGroup
```
+ 将用户test从testGroup组中移出
```bash
gpasswd -d test testGroup
```

### 3、删除用户

+ 将test用户删除
```bash
userdel test
```


### 4、查看用户

+ 查看当前登录用户
```bash
w
who
```
+ 查看自己的用户名
```bash
whoami
```
+ 查看单个用户信息
```bash
finger [username]
id [username]
```
+ 查看用户登录记录
```bash
# 查看登录成功的用户记录
last 
# 查看登录不成功的用户记录
lastb 
```
+ 查看所有用户
```bash
cut -d : -f 1 /etc/passwd
cat /etc/passwd |awk -F \: '{print $1}'
```

## 安装好Debian后还不能使用sudo

+ 如果没有安装sudo，则在root用户下 `apt-get install sudo`
+ 在root设置sudoers配制文件
```bash
chmod +w /etc/sudoers
vim /etc/sudoers
```
+ 添加一行并保存
```bash
# username是你的用户名
username  ALL=(ALL) ALL
# 如果sudo时不想输入密码，可以把上句改成：
username  ALL=(ALL) NOPASSWD: ALL
```
+ 更改sudoers文件权限
```bash
chmod 0440 /etc/sudoers
```
+ 退出root
