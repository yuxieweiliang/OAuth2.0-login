## 使用

1. 下载项目代码。

```bash
git clone git@codehub.devcloud.huaweicloud.com:Authorize00001/oAuth2.0.git authorize
cd authorize
```

2. 进入目录安装依赖。

```bash
yarn install
```

或者

```bash
npm install
```

3. 启动本地服务器。

```bash
npm run dev
```

或者

```bash
npm start
```

6. 启动完成后打开浏览器访问 [http://localhost:8083](http://localhost:8083)，如果需要更改启动端口，可在 `/config/location` 文件中配置。


## 项目架构

- client: 客户端
    - components:                   组件
    - config:                       配置
    - controller:                   前端 js 入口
    - models:                       api 请求 数据 model
    - services:                     ajax 请求处理封装
    - utils:                        工具函数
    - root.less:                    公共样式

- config: 配置

- dist: 本地打包目录

- bundle: 线上发布 - 打包路径

- public: 公共资源 # 用户上传的各种资源
    - demo:                         认证服务器请求示例
    - images:                       图片
    - assets:                       静态资源
    - video:                        视频
    - audio:                        音频

- public: 静态资源 # 存放系统需要的文件

- src: 服务端代码
    - controllers:                  api 逻辑处理
    - initial:                      数据库 初始化
    - model:                        数据库 模型定义
    - services:                     读者端
        - database:                                 { 数据库 }
        - middleware:                               { 中间件 } 入口
        - redis:                                    redis 缓存
        - socket:                                   web Socket
        - controller:                               http 控制 GET POST PUT DELETE
        - hooks:                                    帮助行数
        - http-logger:                              浏览器端日志打印
        - logger:                                   错入日志打印
        - message:                                  请求错误信息
        - middleware:                               { 中间件 } 入口
        - mixinUser:                                { 中间件 } 从 token 中解析 user
        - models:                                   { 数据库 } 模型引用
        - relationship:                             { 数据库 } 关系引用
        - returns:                                  格式化返回
        - routers:                                  路由
        - tables:                                   { 数据库 } 表引用
        - utils:                                    工具函数
    - webpack:                                      服务端渲染 react打包 webapck 配置

- views: 模板














年级    班级    课程    老师     教室     时间


一年级一班



























