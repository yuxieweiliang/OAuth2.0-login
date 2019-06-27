
<p align="center">
  <a href="http://github.com/zuiidea/antd-admin">
    <img alt="antd-admin" height="64" src="./docs/_media/logo.svg">
  </a>
</p>

<h1 align="center">OB Reading</h1>

<div align="center">

一套优秀的中后台前端解决方案

[![antd](https://img.shields.io/badge/antd-^3.10.0-blue.svg?style=flat-square)](https://github.com/ant-design/ant-design)
[![umi](https://img.shields.io/badge/umi-^2.2.1-orange.svg?style=flat-square)](https://github.com/umijs/umi)
[![GitHub issues](https://img.shields.io/github/issues/zuiidea/antd-admin.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
![Travis (.org)](https://img.shields.io/travis/zuiidea/antd-admin.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/zuiidea/antd-admin/pulls)
[![Gitter](https://img.shields.io/gitter/room/antd-admin/antd-admin.svg)](https://gitter.im/antd-admin/antd-admin)

</div>





## 使用

1. 下载项目代码。

```bash
git clone git@github.com:yuxieweiliang/node-ant.git new-project
cd new-project
```

2. 进入目录安装依赖，国内用户推荐使用 [cnpm](https://cnpmjs.org) 进行加速。

```bash
yarn install
```

或者

```bash
npm install
```

3. 启动作者端。

```bash
npm run dev:admin
```

4. 创建数据库。

```bash
npm run initpg
```

5. 启动本地服务器。

```bash
npm start
```

6. 启动完成后打开浏览器访问 [http://localhost:8081](http://localhost:8081)，如果需要更改启动端口，可在 `.env` 文件中配置。


> 作者端前后端分离，读者端服务端渲染，app使用RN，只开发api。。




## 项目架构

- client: 客户端
  - admin: 作者端
    - components: 组件
    - reducers: 数据 store
    - router: 路由
    - src: 页面
    - style: 公共样式
    - views: 公共模板
  - api: api
  - app: app
  - config: 配置
  - utils: 工具函数
  - web: 读者端

- public: 公共资源
  - images: 图片

- server: 服务端
  - controllers: API
  - database: 数据库
  - docs: 文档
  - middleware: 中间件
  - Schema: GraphQL
  - socket: socket
  - sql: API 使用到的sql
  - webpack: react 服务端渲染配置

- tool: 工具
  - config: 数据库配置（创建数据库时）
  - createPage: 创建自定义组件默认内容
  - PG_SQL: 创建数据库表格SQL语句
  - 数据库: 数据库设计 & 输出API格式实例



# 页面路由

    /login # 登陆
    /register # 注册
    /book # 书籍列表
      /book/new # 新建
      /book/edit # 编辑
    /architecture # 架构列表
      /architecture/new # 新建
      /architecture/edit # 编辑
    /database
    /setting


# 其他

https://github.com/reactjs/express-react-views

网站:

设定：

网站可以构建一个设定，其他人可以提出要求，作者可以同意采用。

头脑风暴：

可以做头脑风暴联想，单词的近义词，同类词，联想词。


作家专区：

首页/课堂/专栏/咨询

我的专区：

专区首页/作品管理/数据统计/稿酬收入/劳务收入/作家咨询/积分兑换/互动管理

作品管理：

作品设置/草稿箱/已发布章节/回收站

作品设置：

作品名称/首发站点/书号/作品类型/授权级别/编辑分组/字数/收藏/作品状态/作品标签/作品介绍/扉页寄语

新建章节：

选择章节/选择类型/统计字数/保存/发布

新建作品：

选择类型/目标读者/



## 支持环境

现代浏览器及 IE9。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions








