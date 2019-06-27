export default function(client) {
  var userId = '321321';
  // 客户端的send方法发送的消息
  client.on('notice', function(data, cb) {

    console.log('退订', data.userId);
    if(data.userId === userId) {
      cb('ffffffffffffffff----');
    }
  });
}