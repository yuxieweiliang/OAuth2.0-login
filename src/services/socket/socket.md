{
  user_id: 0,
  user_resident_room: [0, 1, 2, 3], # 常驻房间 房间号为 ID
  user_temporary_room: [0, 1, 2, 3], # 临时房间 房间号为 ID
  user_frineds: [0, 1, 2, 3], # 房间号为 本人与好友的 ID 组合 ({user_id + `-${key}-` + friend_id}).toString()
}