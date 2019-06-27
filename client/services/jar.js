const MSG = {
    INVALID_URI: '`url` must be a string.',
    INVALID_TYPE: 'Invalid message parsing mode, An optional value: arrayBuffer,blob,json,text,formData',
    SERVER_ERR: 'Server processing failed, status: $1, descr: $2',
    NO_URLSearchParams: 'Could not find the object `URLSearchParams`.',
    NO_URL: 'Could not find the object `NO_URL`.',
    INVALID_HOST: 'Invalid remote server Host.',
};

/**
 * 网络请求
 * IE 兼容 ： url-polyfill url-search-params-polyfill 
 * @method ajax http(s)的请求，请求方式自定义
 * 请求的返回值的解析方式，可选值：'arrayBuffer', 'blob', 'json', 'text', 'formData'
 */
export default class Jar {
    constructor() {
        this.errorName = '[JarError]';
        if (!URL) {
            throw this.toError(MSG.NO_URL);
        }
        if (!URLSearchParams) {
            throw this.toError(MSG.NO_URLSearchParams);
        }
    }

    // 请求开始时
    before(options, callback) { }

    // 请求结束
    after(data, callback) { }

    // 请求失败处理函数
    failed(err, callback) { }

    // 抛出错误
    toError(err, ...args) {
        const name = this.errorName;

        if (err instanceof Error) {
            err.name = name;
            return err;
        } else if (typeof err === 'string') {
            let i = 0

            return new Error(`${name} ${err.replace(/\$\d+/g, meta => args ? args[i++] : meta)}`);
        }
        return new Error(`${name} Unknown Params`);
    }

    /**
     * @param {object} options
     * @param options.type: ---- arrayBuffer blob json text formData
     * @param options.body: JSON.stringify(data) ---- must match 'Content-Type' header
     * @param options.query: URLSearchParams ---- must match 'Content-Type' header
     * @param options.cache: 'no-cache' ---- *no-cache, reload, force-cache, only-if-cached
     * @param options.credentials: 'same-origin' ---- include, same-origin, *omit
     * @param options.headers:  {
     *                    'user-agent': 'Mozilla/4.0 MDN Example',
     *                    'content-type': 'application/json'
     *          }
     * @param options.method: 'POST' ----  *GET, POST, PUT, DELETE, etc.
     * @param options.mode: 'cors' ----  no-cors, cors, *same-origin
     * @param options.redirect: 'follow' ----   manual, *follow, error
     * @param options.referrer: 'no-referrer' ----  *client, no-referrer
     *
     * @param {object} hooks
     * @param hooks.before(options)  ---- request send before
     * @param hooks.after(data) ---- request send after
     * @param hooks.failed(err) ---- request send failed
     */
    async ajax(options, hooks) {

        hooks = Object.assign({}, hooks);
        this.before(options, hooks.before); 

        options.credentials = typeof options.credentials === 'string'
            ? options.credentials
            : 'omit';

        if (options.headers) {
            options.headers = new Headers(options.headers);
        }

        let type = options.type;
        delete options.type;

        const data = await fetch(options.url, options).then(res => {
            if (res.ok) {
                if (type) {
                    if (res[type]) {
                        return res[type]();
                    }
                    return this.toError(MSG.INVALID_TYPE);
                }
                return res;
            }
            return this.toError(MSG.SERVER_ERR, res.status, res.statusText);
        }).catch(err => this.toError(err));

        data instanceof Error ? this.failed(data, hooks.failed) : this.after(data, hooks.after);

        return data;
    }
}

