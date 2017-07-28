# ubuntu 开机自动启动

> 最近尝试自动化，遇到很多坑，今天写写ubuntu自动启动的问题。

先从坑一ubuntu init系统程序说起吧。init初始化系统的工具，init的启动首先要知道系统的时的默认运行级别，有文章说是位于`/etc/inittab`,但是我在亚马逊EC2 (Ubuntu 16.04.1 LTS (GNU/Linux 4.4.0-66-generic x86_64)上并没有找到这个文件。我是google了好久找到的`runlevel`	命令:

![过程图](/static/img/ubuntu-boot/001.jpg)

知道默认运行级别就好办啦。根据级别`N 5`，找到`/etc/rc5.d/`，这里就是系统默认启动的程序目录。

![过程图](/static/img/ubuntu-boot/002.jpg)

这里说一下，ubuntu有8个启动级别，是0-6和S。分别对应`/etc/rcN.d/` 8个文件夹。

然而，你以为找到`/etc/rcN.d/`目录久找到脚本啦，too young too simple。`/etc/rcN.d/`目录下的所有文件只是‘软连接’。😯
执行`ls -lh /etc/rc5.d/` 命令:

![过程图](/static/img/ubuntu-boot/003.jpg)

自动启动需要的所有脚本都在`/etc/init.d/`文件夹里。`/etc/rcN.d/`只是控制启动关闭的软连接，文件夹下所有程序文件名的格式为： `S/K + NN + NAME`。系统进入默认运行级别时，init会杀掉所有以K开头的程序，启动以S开头的程序，按照NN的大小，从低到高开始启动/停止程序。NAME则是程序的名字，也是启动之后进程的名字。如果想详细了解init系统可以参： [总结 - Linux初始化过程（init系统）](http://monklof.com/post/14/)

init在`/etc/rcN.d/`脚本执行完成后，所有的系统服务此时已经执行成功，之后会找`/etc/rc.local`脚本文件，我的理解这个脚本文件是用户自己启动的程序。所以，马上配置`/etc/rc.local`，重启系统。

![过程图](/static/img/ubuntu-boot/004.jpg)

然而并没有等到欣喜的启动成功。

再了解了init系统程序之后我知道我的所有配置都是对的，但是，我的脚本还是启动不了。这个就很尴尬啦，既然还不对那肯定是出错啦，看看系统启动日志好了。然而万万没想到，系统启动日志也是个坑。我google查到的文章都把系统启动日志写成`/var/log/boot.log`，wtf，我在我的机器上怎么都找不到它。不知道是不是EC2的问题，还没查证。万般无奈之下，我只能去`/var/log/`里一个个log找。终于发现一个名字很符合的文件：

![过程图](/static/img/ubuntu-boot/005.jpg)

打开一看果然是启动日志，查看日志分析，找到了一处nginx报错：

![过程图](/static/img/ubuntu-boot/006.jpg)

这个错误很明显，是要输入密码，于是google查了一下，原来nginx是需要配置没有密码的key。对比脚本，猜测应该是我的再次执行nginx，导致`/etc/rc.local`报错，下面的shell都没有执行。于是注释掉nginx和jenkins，nginx的key换成不用输入密码的。

![过程图](/static/img/ubuntu-boot/007.jpg)

`sudo reboot` 脚本启动成功。




