# MutiPersonChat-Backend





## 分层

```

```











# 接口文档



### 登录 `/ws/login` POST

没有特别的安全处理逻辑，如果未注册则直接注册

request

```js
{
	user_name:
}
```



```js
{
    "code": 200,
    "message": "",
    "data": {
        "user_id": 1636282788747,
        "user_name": "qianlong",
        "user_img": ""
    }
}
```





### 获取























# temp



1. 用户的数据转到 db 中
2. 默认一个 ws 的总群
3. 

