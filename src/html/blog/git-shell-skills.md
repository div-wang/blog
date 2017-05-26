# git shell 技巧

> git作为常用的代码管理工具，有些shell脚本可以大大提高使用git的效率，本文主要介绍一下我常用的一些shell技巧。

### git shell 自动补全
##### 如果你用的是 Bash shell，可以试试看 Git 提供的自动补全脚本

+ git的源代码包里有个自动补全的shell脚本：
`contrib/completion／git-completion.bash`
+ 把这个文件保存到`~/.git-completion.bash`，
+ 然后在`.bash_profile`中加入一行
```bash
    source ~/.git-completion.bash
```
+ 重启终端即可使用

##### 也可以为系统上所有用户都设置默认使用此脚本。
 + 脚本复制到本机
    +  Mac `/opt/local/etc/bash_completion.d` 目录中，
    +  Linux 复制到 `/etc/bash_completion.d/` 目录中。
+  这两处目录中的脚本，都会在 Bash 启动时自动加载。

[2.7 Git 基础 - 技巧和窍门](https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%8A%80%E5%B7%A7%E5%92%8C%E7%AA%8D%E9%97%A8)

### 设置Git命令别名

##### 打开`.bash_profile `文件
```bash
    vi ~/.bash_profile
```

##### 设置以下别名
```bash
    alias gst='git status'

    alias gcom='git commit -m'

    alias gadd='git add .'

    alias push='git push origin'

    alias pull='git pull origin'

    alias gb='git branch'

    alias gba='git branch -a'

    alias gbd='git branch -D'

    alias glog='git log'

    alias gc='git checkout'

    alias gcb='git checkout -b'

    alias gcf='git checkout -f'
```


##### 也可以设置其他shel命令别名
```bash
alias pss='ps -ef|grep'

alias k9='kill -9'

alias chmod7='chmod -R 777'

alias grep='grep --color'

alias ll='ls -l'

alias rm='rm -i'
```



