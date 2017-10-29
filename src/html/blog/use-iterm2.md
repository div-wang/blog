# 使用iTerm2代替mac默认终端

> 其实我一直用的是mac默认终端，主要是觉得mac自带，不用下载多余软件，自己的配置也比较好，什么git自动提醒，vim高亮之类都可以实现。最近发现公司同事都在用iTerm2，仔细搜索了下iTerm2，发现可以完全导入我的bash配置，所以决定转向iTerm2。

## 安装iTerm2
默认从[官网](http://www.iterm2.com/)下载

[iTerm2使用技巧](http://wulfric.me/2015/08/iterm2/)

## 安装zsh
+ Mac默认自带zsh，所以可以直接安装oh-my-zsh
+ Ubuntu Linux下，使用`apt-get`
```bash
sudo apt-get install zsh
```
+ Ubuntu Linux下，使用`apt-get`
```bash
sudo yum install zsh -y
```

## 安装oh-my-zsh
zsh 的默认配置及其复杂繁琐，oh-my-zsh是zsh的配置插件，安装oh-my-zsh是为了减少zsh配置带来的烦恼。

官方github: [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

我这里是用curl的方式安装
```bash
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
```
## zsh更换主题
换个漂亮的主题
![agnoster-fcamblor.zsh-theme](https://gist.githubusercontent.com/fcamblor/f8e824caa28f8bea5572/raw/8c96ec7d669edac8ae1e1935fe389ee7b3bf543c/screenshot.png)
修改文件~/.zshrc中的`ZSH_THEME`一行，改成这个
```bash
ZSH_THEME="agnoster"
```
重新打开一个terminal就行了

如果没有箭头，只有方框+问号的话，还需要安装powerline

这是一个字体增强的软件，就是往字体库里面新加了一个字体

在github可以直接下载然后执行install.sh来安装👉[Powerline-patched font](https://github.com/powerline/fonts)

一步一步的安装方法参见👉[powerline的文档](https://powerline.readthedocs.org/en/latest/installation/linux.html#font-installation)

然后在你的终端gui设置里面，把字体改成后缀为powerline的字体就行了

## zsh使用系统默认配置.bash_profile
默认使用zsh后，bash配置是失效的
需要在`.zshrc`中导入`.bash_profile`配置:
+ 执行`vi ~/.zshrc`,
+ 将 `source .bash_profile` 粘贴到最下面，保存即可。

## go2shell默认打开iTerm2
而Go2Shell默认没有设置界面,需要用命令行打开(隐藏得真深)
在Shell中输入:
```bash
open -a Go2Shell --args config
```
打开设置界面
![](http://upload-images.jianshu.io/upload_images/531570-4d1263d149c3a10c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
选择`iTerm2`选项，点击`Save&Quit`保存退出即可

## 配置sublime Terminal 插件默认打开iTerm2
打开sublime，选择
`Preferences > Package Setting > Terminal > Setting Default`
```js
{
  // The command to execute for the terminal, leave blank for the OS default
  // See https://github.com/wbond/sublime_terminal#examples for examples
  // 设置Terminal快捷键默认打开iTerm2
  "terminal": "iTerm2-v3.sh",

  // A list of default parameters to pass to the terminal, this can be
  // overridden by passing the "parameters" key with a list value to the args
  // dict when calling the "open_terminal" or "open_terminal_project_folder"
  // commands
  // 默认新标签打开
  "parameters": ["--open-in-tab"],

  // An environment variables changeset. Default environment variables used for the
  // terminal are inherited from sublime. Use this mapping to overwrite/unset. Use
  // null value to indicate that the environment variable should be unset.、
  // 默认环境变量，不做修改
  "env": {}
}
```
