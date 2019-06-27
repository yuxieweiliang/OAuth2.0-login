export default function(client) {
  // 客户端的send方法发送的消息
  client.on('message', function(data) {
    console.log('-|-|-|-|-|-|-|-|-|-|-|-', data)
  });
}