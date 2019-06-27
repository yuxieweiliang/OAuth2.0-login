一、 授权模式: # http://localhost:8063/demo/01_authorization.html

1、 打开服务器，获取授权
    http://localhost:8063/oauth2.0/authorize?client_id=1&redirect_uri=http://localhost:12542/authExpress/index.html&response_type=token
 分为两种情况
    - 1、 用户已登录 —> 重定向到同意授权页面
          http://localhost:8063/oauth2.0/authorize?client_id=1&redirect_uri=http://localhost:12542/authExpress/index.html&response_type=token
          用户拒绝：
          http://localhost:12542/authExpress/index.html?error=access_denied
          用户同意：—> 原始页面，并回送 code 授权码
          http://localhost:12542/authExpress/index.html?code=k7N9qvGfbbzsC810Tj9ih1
          通过 code 授权码，访问认证服务器，获取token { 这一步应该在服务器发送 }
          http://localhost:8063/oauth2.0/access_token?client_id=1&client_secret=xxx&grant_type=authorization_code&code=4pgQZ-p-NH6bQCRn1HC1lE
          获取成功返回值
          response {
            access_token: "GV-F_QFR6YAZtcwH3auLjrl8=EFsjmzt46b697f8fad35faa0d7aa75d",
            refresh_token: null,
          }

    - 2、用户未登录 —> 重定向到登陆页面 —> 登陆成功 —> 重定向到同意授权页面
          - 1、 重定向到登陆页面
                http://localhost:8063/login?next=/oauth2.0/authorize?client_id=1&redirect_uri=http://localhost:12542/authExpress/index.html&response_type=token
          - 2、 登陆成功 —> 重定向到同意授权页面 然后同上
                http://localhost:8063/oauth2.0/authorize?client_id=1&redirect_uri=http://localhost:12542/authExpress/index.html&response_type=token

二、简化模式:
  http://localhost:8063/oauth2.0/authorize?client_id=1&redirect_uri=http://localhost:12542/authExpress/index.html&response_type=token
  分为两种情况:
    已登录: —> 同意授权 —> 重定向到原始页面并返回token
        http://localhost:12542/authExpress/index.html?access_token=SnaTeKu4MjmrB8-4HOOnxPBQ0wA%3DV4auhPz7f262f58cbaa32aae1ba90b948041ee942ddde1b27fa03230134b0ceb
    未登录:  —> 跳转到登录页 —> 登陆成功 —> 重定向到同意授权页面 —> 同意授权 —> 重定向到原始页面并返回token
      http://localhost:12542/authExpress/index.html?access_token=SnaTeKu4MjmrB8-4HOOnxPBQ0wA%3DV4auhPz7f262f58cbaa32aae1ba90b948041ee942ddde1b27fa03230134b0ceb



三、密码模式: # 非常信任
      http://localhost:8063/oauth2.0/access_token?grant_type=password&client_id=1&username=123456&password=123456&client_secret=xxx

四、客户端模式: # 未定

90000 - 22000
3515   142    69712  3269
3387   142    67508  3269
3258   142    65271  3269






