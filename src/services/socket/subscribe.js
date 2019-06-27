export default function(client) {
  // 客户端订阅
  client.on('subscribe', function(data, cb) {
    // 加入房间
    client.join(data.room);
    // 通知当前房间的其他人，但是自己并不收到消息
    client.broadcast.to(data.room).emit('subscribe', data);

    console.log(data);
    // 回调
    cb('成功')
  });
}