export default function(client) {
  // 客户端退订事件
  client.on('unsubscribe', function(data) {
    client.leave(data.room);
    // 通知当前房间的其他人，但是自己并不收到消息
    client.broadcast.to(data.room).emit('unsubscribe', data);
  });
}