export default function(client) {
  // 断开连接
  client.on('disconnect', function(data){
    console.log('--------disconnect', data)
  });
}