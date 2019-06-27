
export default {
  // tracker servers
  trackers: [
    {
      host: '114.116.22.1',
      port: 22122
    }
  ],
  // 默认超时时间10s
  timeout: 10000,
  // 默认后缀
  // 当获取不到文件后缀时使用
  defaultExt: 'txt',
  // charset默认utf8
  charset: 'utf8'
}

// fastdfs.connect_timeout_in_seconds = 5
// fastdfs.network_timeout_in_seconds = 30
// fastdfs.charset = UTF-8
// fastdfs.http_anti_steal_token = false
// fastdfs.http_secret_key = FastDFS1234567890
// fastdfs.http_tracker_http_port = 80
