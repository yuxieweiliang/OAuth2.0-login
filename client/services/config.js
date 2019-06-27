import BASE from './base';
import { CODE } from './code';

export default {
    IMG_HOST: BASE.isDev ? 'http://localhost:8333' : 'http://114.116.28.122:8333',
    API_HOST: BASE.isDev ? 'http://localhost:8063' : 'http://114.116.28.122:8063',
    API_TAKE: CODE.token,
    API_INFO: {

        // -------------------------------
        // 获取权限列表
        getAuth: {
            type: 'json',
            method: 'POST',
            path: '/oauth2.0/authorize'
            /**
             *  body = {
             *      name: '', // String - requried
             *      url: '', // String - requried
             *      intro: '', // String
             *      status: '' // Number
             *  }
             */
        },

        // 新建评论项目
        createCommentProject: {
            type: 'json',
            method: 'POST',
            path: '/comment/project'
            /**
             *  body = {
             *      name: '', // String - requried
             *      url: '', // String - requried
             *      intro: '', // String
             *      status: '' // Number
             *  }
             */
        },

        // 删除指定ID的评论项目 `DELETE /comment/project` === `POST /comment/project/delete`
        deleteCommentProject: {
            type: 'json',
            method: 'POST',
            path: '/comment/project/delete'
            /**
             * body = {
                    id: -1 // String - required
                }
             */
        },

        // 修改指定ID的评论项目的ID `PUT /comment/project` === `POST /comment/project / update`
        updateCommentProject: {
            type: 'json',
            method: 'POST',
            path: '/comment/project/update'
            /**
             *  body = {
                    id: -1,// String - required
                    name: '', // String - requried
                    url: '', // String - requried
                    intro: '', // String
                    status: '' // Number
                }
             */
        },

        // 获取所有可评论项目
        getAllCommentSubject: {
            type: 'json',
            method: 'GET',
            path: '/comment/subject'
            /**
             *  query = {
                    project: -1 // Number - allow null
                }
             */
        },

        // 创建一个评论项目的可评论对象
        createCommentSubject: {
            type: 'json',
            method: 'POST',
            path: '/comment/subject'
            /**
             *  body = {
                    project: -1, // Number - requried
                    name: '', // String - requried
                    intro: '', // String
                    status: 1 // Number
                }
             */
        },

        // 删除可评对象  `DELETE /comment/subject` === `POST /comment/subject / delete `
        deleteCommentSubject: {
            type: 'json',
            method: 'POST',
            path: '/comment/subject/delete'
            /**
             *  body = {
                    id: -1 // Number - required
                }
             */
        },

        // 修改可评对象
        updateCommentSubject: {
            type: 'json',
            method: 'POST',
            path: '/comment/subject/update'
            /**
             *  body = {
                    id: -1, // Number - required  --------- project does not update
                    name: '', // String - requried
                    intro: '', // String
                    status: 1 // Number
                }
             */
        },

        // 获取所有评论
        acquireComment: {
            type: 'json',
            method: 'POST',
            path: '/comment/acquire'
            /**
             *  query = {
                    pageNo  : 0, // number - page Number
                    pageSize: 0, // number - page Size
                    target  : 0, // number - target ID
                    project : 0, // number - project ID
                    subject : 0, // number - project subject ID
                    orderby : 0, // object - order by rule --> 'status', 'great', 'updated_at'
                }
             */
        },

        // 插入评论
        createComment: {
            type: 'json',
            method: 'POST',
            path: '/comment/'
            /**
             *  body = {
                    project: -1, // Number - project ID
                    subject: -1, // Number - subject ID
                    target: -1, // Number - target ID
                    father: -1,  // Number - The parent of the current comment
                    user: -1,    // Number - user ID The user ID that initiated the comment
                    body: '',    // String - comment content
                    voice: ''    // String - voice-url
                }
             */
        },

        // 删除评论 `DELETE /comment/` === `POST /comment/delete`
        deleteComment: {
            type: 'json',
            method: 'POST',
            path: '/comment/delete'
            /**
             *  body = {
                    project: -1, // Number - project ID
                    subject: -1, // Number - subject ID
                    target: -1, // Number - target ID
                    id: -1,     // Number - comment ID
                }
             */
        },

        // 删除评论 `DELETE /comment/` === `POST /comment/update`
        updateComment: {
            type: 'json',
            method: 'POST',
            path: '/comment/update'
            /**
             *  body = {
                    project: -1, // Number - project ID
                    subject: -1, // Number - subject ID
                    target: -1, // Number - target ID
                    id: -1,      // Number - comment ID

                    body: '',    // String - comment content
                    voice: '',   // String - voice-url
                    great: 0,    // Number - some praise the number
                    status: 1,   // Number - status
                }
             */
        }
    }
}
