import {message} from "antd";

const { request } = services;
import { CODE } from '../config/code';


export default new class User {
  constructor() {
    this.expires = 0; // 缓存时间五分钟
  }

  /**
   * 刷新模式 刷新所有
   * @param data
   * @param mode
   */
  refreshCache(data, mode) {
    let cached = store.get(CODE.allGrade);
    const result = utils.refreshCache(cached, data, mode);

    store.set(CODE.allGrade, result, this.expires);

    return result;
  }
  /**
   * 使用用户ID查询用户信息
   * @param {array} ids
   */
  async getUserInfoByIds(body) {
    let data = store.get(CODE.user);
    if(!data) {
      const res = await request.query('getUserInfoByIds', { body });

      if (res && res.code === 0) {
        store.set(CODE.allGrade, res.data, this.expires);
        data = this.refreshCache(res.data, 'add');
      } else {
        message.error('用户信息获取失败!');
      }
    }

    return data;
  }

  /**
   * 使用用户ID查询用户信息
   * @param {Number} id 用户ID
   */
  async getUserInfo(id) {
    return await request.query('getUserInfo', { param: id });
  }

  /**
   * 更新或修改指定ID的用户信息
   * @param {object} query: {}  用户信息
   * @param {object} body 需要更新的用户信息
   */
  async updateUserInfo(query, body) {
    try {
      const res = await request.query('updateUserInfo', { query, body });
      if(res.code === 0) {
        return this.refreshCache({id, ...body}, 'update');
      } else {
        message.error(res.msg);
      }
    } catch (e) {
      message.error(e.message);
    }
  }

  /**
   * 获取用户列表
   * @param {object} body
   */
  async getUserList(body) {
    return await request.query('getUserList', { body });
  }

  /**
   * 使用Excel表格批量导入用户
   * @param {object} query: {gradeId, classId} 用户ID
   * @param {object} body 导入的数据
   */
  async bulkImportUser(query, body) {
    return await request.query('bulkImportUser', { query, body });
  }

  /**
   * 使用有权限的用户创建一个用户
   * @param {number} id 创建用户的用户的ID
   * @param {object} body 被创建的用户信息
   */
  async createUserByUser(id, body) {
    return await request.query('createUserByUser', { param: id, body });
  }

  /**
   * 删除用户
   * @param {number} id 被删除用户的ID
   * @param {object} body
   */
  async deleteUser(id, body) {
    return await request.query('deleteUser', { param: id, body });
  }

  /**
   * 获取学生
   * @param {number} grade 年级 ID
   * @param {number} classes 班级 ID
   * @param {object} body 查询
   */
  async getStudents(grade, classes, body) {
    return await request.query('getStudents', { param: [grade, classes], body });
  }
}
