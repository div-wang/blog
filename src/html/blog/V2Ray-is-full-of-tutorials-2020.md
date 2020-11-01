
#  V2Ray 使用教程 2020

> 上一篇的V2Ray是2017年写的，至今已经3年了，V2Ray有很多不一样的地方，决定重新写一篇文章

## V2Ray是什么
V2Ray经过这几年发展，已经成为了和ssr并驾齐驱的工具，所以安全性方面做了很多优化，后面我会给出一个具体配置示例出来

[V2Ray官方网站](https://www.v2ray.com/)

[V2Ray-Github](https://github.com/v2ray/)

## 服务端搭建过程

国外的免费vps路子已经不行了，我的免费vps全部到期了，目前再使用国内云场的`轻量应用服务器`，主要是价格便宜，1核2G、50G SSD、30M带宽、2T流量，每月只需要34元。速度上跟gcp和aws有点差距，不过自己用足够了。

大家自行搜索就行这里不做推荐，

### 登录 vps 自动执行安装脚本

运行以上命令需要root权限，所以需要切换到root账户下，也可以使用`sudo`命令
```bash
  bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```
该脚本会自动安装以下两个文件：
```js
  /usr/bin/v2ray/v2ray：V2Ray 程序；
  /usr/local/etc/v2ray/config.json：配置文件；
```

##### 官方说明：此脚本会配置开机自动运行脚本，仅适用于 SysV 模式，不支持 Debian 7 的 systemd。

### V2Ray配置配置

##### 编辑 /usr/local/etc/v2ray/config.json 文件来配置代理方式，这里给出新的配置，是最近3年来我绝得最稳定的配置

```json
{
  "log": {
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log",
    "loglevel": "info"
  },
  "inbounds": [
    {
      "protocol": "vmess",
      "port": 4443,
      "settings": {
        "clients": [
          {
            "id": "5aab154f-c93c-46bd-9a73-dc3bbf7c6b4d",
            "level": 1,
            "alterId": 16,
            "security": "auto"
          }
        ]
      }
    },
    {
      "protocol": "shadowsocks",
      "port": 3389,
      "settings": {
        "method": "aes-256-cfb",
        "password": "div_123654",
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ],
  "routing": {
    "strategy": "rules",
    "settings": {
      "rules": [
        {
          "type": "field",
          "ip": [
            "0.0.0.0/8",
            "10.0.0.0/8",
            "100.64.0.0/10",
            "127.0.0.0/8",
            "169.254.0.0/16",
            "172.16.0.0/12",
            "192.0.0.0/24",
            "192.0.2.0/24",
            "192.168.0.0/16",
            "198.18.0.0/15",
            "198.51.100.0/24",
            "203.0.113.0/24",
            "::1/128",
            "fc00::/7",
            "fe80::/10"
          ],
          "outboundTag": "blocked"
        }
      ]
    }
  }
}
```
ssr端口我试过很多，什么3001-3033、10086这些非系统流量端口总是被封tcp流量，换成3389之后就没有这个问题了。

#### 国内服务器转发

##### 安装最新发行的 geoip.dat 和 geosite.dat

```bash
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-dat-release.sh)
```
##### 转发配置
```json
{
  "log" : {
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log",
    "loglevel": "info"
  },
  "inbounds": [
    {
      "protocol": "vmess",
      "port": 4443,
      "settings": {
        "clients": [
          {
            "id": "25f8fa73-9468-4b6a-...",
            "level": 1,
            "alterId": 16,
            "security": "auto"
          }
        ]
      }
    },
    {
      "protocol": "shadowsocks",
      "port": 80,
      "settings": {
        "method": "aes-256-cfb",
        "password": "123456",
        "udp": true
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    },
    {
      "protocol": "shadowsocks",
      "settings": {
        "servers": [
          {
            "address": "国外VPS IP",
            "port": 3389,
            "method": "aes-256-cfb",
            "password": "123456",
            "level": 0
          }
        ]
      },
      "tag": "test"
    }
  ],
  "routing": {
    "domainStrategy": "IPIfNonMatch",
    "rules": [
      {
        "type": "field",
        "ip": [
          "geoip:private",
          "geoip:cn"
        ],
        "outboundTag": "blocked"
      },
      {
        "type": "field",
        "domain": [
          "ext:gfw.dat:gfw",
          "geosite:google",
          "geosite:geolocation-!cn"
        ],
        "network": "tcp,udp",
        "user": [
          "gh110827@gmail.com"
        ],
        "outboundTag": "test"
      }
    ]
  }
}
```
### V2Ray启动说明

运行 `service v2ray start` 来启动 V2Ray 进程

| service v2ray 方法  | 功能描述 |
| ------------- | ------------- |
| start | 启动 V2Ray |
| stop | 停止 V2Ray |
| status | 查看 V2Ray 启动信息 |
| reload | 重新加载 V2Ray 配置信息|
| restart | 重新启动 V2Ray  |
| force-reload | 强制重新加载 V2Ray 配置信息 |


## 客户端

#### 官方网站上有丰富的 GUI 客户端：

[V2Ray 客户端列表](https://www.v2ray.com/awesome/tools.html)

这里因为我使用的设备是mac本和安卓手机，选择的`V2RayX`和`V2RayNG`

现在的V2Ray第三方开源客户端软件，体验上完全不输付费翻墙软件，大家可以根据自己系统和主力机型自主选择下载

#### 使用shadowsocks客户端

服务端配置好shadowsocks，使用shadowsocks客户端连接到上面定义的shadowsocks端口3389进行测试上网是否成功。


## 参考：

[V2Ray 使用教程](https://blog.div-wang.com/2017/10/V2Ray-is-full-of-tutorials.html)

[V2Ray完全配置指南](https://ailitonia.com/archives/v2ray%E5%AE%8C%E5%85%A8%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97/)

[第三方客户端](https://www.v2ray.com/awesome/tools.html)





