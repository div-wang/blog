#  V2Ray 使用教程

> 最近一段时间（某大召开），网络经常出现故障，导致严重影响到工作效率，其实就是 github 提交代码和 google 搜索技术问题。在不断搜索之后，决定使用V2Ray搭建 vpn

## V2Ray是什么
V2Ray是一款号称可以替代shadowsocks的软件工具。作者给软件起这个名字的想法，大概就是要用V2火箭的光线来冲出封锁的意思。完全兼容shadowsocks协议，可以当作shadowsocks服务器为影棱客户端提供代理，这就很方便影棱的用户使用。

V2Ray目前还比较小众，所以不会成为研究对象，也正因为比较小众，目前还没有比较多而详细的教程供参考，所以就提高了初学者使用门槛。这里写下我的搭建过程供后人参考。

[V2Ray官方网站](https://www.v2ray.com/)

[V2Ray-Github](https://github.com/v2ray/)

## 服务端搭建过程

### 首先需要一台vps
这里我用的是亚马逊 aws，ubuntu 环境。申请教程：

[使用AWS搭建自己的VPN](http://blog.div-wang.com/2016/05/aws-vpn.html)

或自行搜索：

[申请亚马逊服务器 - google 搜索](https://www.google.com.hk/search?q=%E7%94%B3%E8%AF%B7%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%9C%8D%E5%8A%A1%E5%99%A8&rlz=1C1CHWL_zh-CN__669__670&oq=%E7%94%B3%E8%AF%B7%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%9C%8D%E5%8A%A1%E5%99%A8&aqs=chrome..69i57j0l5.9665j0j7&sourceid=chrome&es_sm=122&ie=UTF-8)

[申请亚马逊服务器_百度搜索](https://www.baidu.com/s?wd=%E7%94%B3%E8%AF%B7%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%9C%8D%E5%8A%A1%E5%99%A8&rsv_spt=1&rsv_iqid=0xdfe5dd75000b3330&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&inputT=894)


### 登录 vps 自动执行安装脚本

运行以上命令需要root权限，所以需要切换到root账户下，也可以使用`sudo`命令

```bash
  sudo curl -L -s https://raw.githubusercontent.com/v2ray/v2ray-core/master/release/install-release.sh | sudo bash
```
该脚本会自动安装unzip和deamon，并自动安装以下两个文件：

```js
  /usr/bin/v2ray/v2ray：V2Ray 程序；
  /etc/v2ray/config.json：配置文件；
```
##### 官方说明：此脚本会配置开机自动运行脚本，仅适用于 SysV 模式，不支持 Debian 7 的 systemd。

### V2Ray配置配置

编辑 /etc/v2ray/config.json 文件来配置代理方式，这里给出我的配置示例

```json
{
  "log" : {
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log",
    "loglevel": "warning"
  },
  // v2ray 启用默认配置
  "inbound": {
    "port": 17847,
    "protocol": "vmess",
    "settings": {
      "clients": [
        {
          "id": "80f17883-b465-4612-95b6-2139fe0176df",
          "level": 1,
          "alterId": 64
        }
      ]
    }
  },
  // shadowsocks 配置
  "inboundDetour": [
    {
      "protocol": "shadowsocks", // 开启 Shadowsocks
      "port": 3333, // 监听 3333 端口
      "settings": {
        "method": "aes-256-cfb", // 加密方式，支持 aes-256-cfb 和 aes-128-cfb
        "password": "shadowsocks", // 密码，必须和客户端相同
        "udp": false // 是否开启 UDP 转发
      }
    }
  ],
  "outbound": {
    "protocol": "freedom",
    "settings": {}
  },
  "outboundDetour": [
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "blocked"
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

##### 官方网站上有丰富的 GUI 客户端：

[V2Ray 客户端列表](https://www.v2ray.com/chapter_01/3rd_party.html)

在服务端config.json中`inbound`就是GUI 客户端所需要的上网配置，如果服务端config.json没有对其进行改动，GUI 客户端只需修改ip就可以使用V2Ray了。

##### 以第三方客户端V2RayX为例

只需点击 V2RayX > configure > V2Ray Servers 填写配置
```js
'address' = vps ip 地址 : inbound.port

'User ID' = inbound.settings.clients[0].id
```

##### 使用影棱客户端

服务端配置好shadowsocks，使用影棱客户端连接到上面定义的shadowsocks端口3333进行测试上网是否成功。


## 参考：

[V2Ray 一周年记 & V2Ray 完全使用教程](http://www.chinagfw.org/2016/08/v2ray-v2ray.html)

[V2Ray替换shadowsocks服务器详解](https://www.daehub.com/archives/2156.html)

[第三方客户端](https://www.v2ray.com/chapter_01/3rd_party.html)





