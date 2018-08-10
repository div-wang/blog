# macOS 微信双开、撤回拦截

> 我门都知道安卓手机 root 后可以双开微信、撤回拦截微信消息这些功能，今天这些功能也被移植到 mac 上来了。

## 简单的介绍

**WeChatTweak**不仅可以拦截微信消息，双开微信，还能够免手机认证登录，真是方便的一逼。
![](/static/img/mac-os-wechat/WX20180801-111352@2x.png)

**WeChatTweak**亲测，macOS 10.14 Mojave系统可以正常使用。

提供技术的大神是： [sunnyyoung](https://github.com/Sunnyyoung)
> iOS/macOS 开发者、开源爱好者、业余逆向开发，正在学习前/后端开发，走往全栈目标的路上。

大神的反编译技术相当厉害，ios er 可以多看看他的blog [「Sunnyyoung's Blog」](https://blog.sunnyyoung.net/) 
项目地址：[WeChatTweak-macOS](https://github.com/Sunnyyoung/WeChatTweak-macOS)
还有个QQ的兄弟项目：[QQTweak-macOS](https://github.com/Sunnyyoung/QQTweak-macOS)

## 安装
#### 1、通过git命令安装
打开终端窗口，执行以下命令：
```bash
git clone https://github.com/Sunnyyoung/WeChatTweak-macOS.git \
  && cd WeChatTweak-macOS \
  && sudo make install
```
结果提示 Install successfully! 则安装成功！
#### 2、下载zip包安装
直接点击下载 zip 文件： 
![下载zip](https://camo.githubusercontent.com/921744c74963771cefaa9d0020b9897963134079/68747470733a2f2f692e6c6f6c692e6e65742f323031372f30392f30322f353961613864666365333434622e706e67)
解压到当前指定文件夹，我是解压到`~/Downloads/`目录下，然后执行命令：
```bash
cd ~/Downloads/WeChatTweak-macOS \
    && sudo make install
```
结果提示 Install successfully! 则安装成功！

## 卸载
进入项目文件夹，然后执行：
```bash
  sudo make uninstall
```
即可卸载成功

## 微信 macOS 客户端支持 Alfred
##### WeChat.alfredworkflow  
Alfred 作为 macOS 平台上的效率神器，能够提升效率与体验， [sunnyyoung](https://github.com/Sunnyyoung) 大神也写了一个 [WeChat.alfredworkflow](https://github.com/Sunnyyoung/WeChatTweak-macOS/blob/master/WeChat.alfredworkflow)。  
> 通过 Alfred 模糊搜索联系人并快速跳转到对应聊天界面

使用命令打开项目中的 WeChat.alfredworkflow 文件：
```bash
  open WeChatTweak-macOS/WeChat.alfredworkflow
```
将 WeChat.alfredworkflow 添加到 Alfred

##### 最终效果
![](/static/img/mac-os-wechat/WX20180801-102554@2x.png)

