import axios from 'axios'

// 创建实例时修改配置
var instance = axios.create({
  timeout : 10000,
  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: '/',
});

// 添加一个请求拦截器
var interceptor = axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

// 销毁拦截器
axios.interceptors.request.eject(interceptor);

// 实例创建之后修改配置
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance
