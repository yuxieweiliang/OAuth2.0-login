import { CODE } from '../config/code';
import base64 from '../utils/base64';
const { request, store, image } = services;

export default new class Sign {
    // 登录
    async in(ua) {
        const res = await request.query('signin', {
            body: {
                account: ua.account,
                pwd: ua.pwd
            }
        });

        if (res && res.code === 0) {
            const data = res.data;
            const { rights, info, token } = data;
            delete info.pwd;

            store.set(CODE.info, info);
            store.set(CODE.token, token);
            store.set(CODE.rights, rights);
            return true;
        }

        return res;
    }

    async up(body) {
        return await request.query('signup', { body });
    }



    get status() {
        return store.get(CODE.info);
    }

    set status(obj) {
        const info = Object.assign({}, store.get(CODE.info), obj);

        return store.set(CODE.info, info);
    }

    // 退出
    out(props) {
        store.remove(CODE.info);
        store.remove(CODE.token);
        store.clear();
        props.history.push('/');
    }

    // 初始化登录数据
    init() {
        const pwd = store.get(CODE.pwd);
        return {
            remember: {
                valuePropName: 'checked',
                initialValue: store.get(CODE.remember),
            },

            pwd: {
                rules: [{ required: true, message: '请输入密码!' }],
                initialValue: pwd ? base64.decode(pwd) : ''
            },

            account: {
                rules: [{ required: true, message: '请输入账号!' }],
                initialValue: store.get(CODE.account)
            }
        };
    }

    // 持久化
    localize(values, props) {
        if (values.remember) {
            store.set(CODE.account, values.account);
            store.set(CODE.pwd, base64.encode(values.pwd));
            store.set(CODE.remember, values.remember);
        } else {
            if (store.get(CODE.remember)) {
                store.remove(CODE.account);
                store.remove(CODE.pwd);
                store.remove(CODE.remember);
            }
        }
        props.history.push('/home');
    }
}
