import Jar from './jar';
import config from './config';

const MSG = {
    API_NOT_FOUND: 'There is no `$1` interface.',
    TOKEN_NOT_FOUND: 'The key to the server door was not found.'
};

function isFormData(body) {
    return body instanceof FormData
}

function getPath(pattern, args) {
    let i = 0;
    args = [].concat(args);
    return pattern.replace(/\$\d+/g, meta => args ? args[i++] : meta);
}

function getBearer() {
    const secret = services.store.get(config.API_TAKE);

    return secret ? 'Bearer ' + secret : null;
}

/**
 * 添加权限信息
 * @memberof Jar
 * @private
 */
function setHeaders(allow, options, isFormD) {
    const defaults = {};

    !isFormD && (defaults['Content-type'] = 'application/json;charset=utf-8');
    if (!allow) {
        const bearer = getBearer();

        if (!bearer) {
            throw this.toError(MSG.TOKEN_NOT_FOUND);
        }
        defaults.Authorization = bearer;
    }

    options.headers = Object.assign(defaults, options.headers);
}


function addQueries(url, query) {
    switch (typeof query) {
        case 'object':
            for (let key in query) {
                url.searchParams.append(key, query[key]);
            }
            break;
        case 'string':
        case 'number':
        case 'boolean':
            url.search = (url.search.startsWith('?') ? '&' : '?') + query;
            break;
        default: break;
    }
}

/**
 * 获取参数
 * @memberof Jar
 * @private
 */
function getOptions(name, options) {
    const entity = config.API_INFO[name];
    if (entity) {
        options = Object.assign({}, options);

        const path = getPath(entity.path, options.param);
        const url = new URL(path, config.API_HOST);
        addQueries(url, options.query);

        options.method = entity.method || 'GET';
        options.type = options.type || entity.type || 'json';
        // options.mode = 'no-cors';
        const isFormD = isFormData(options.body)
        setHeaders.call(this, entity.allow, options, isFormD);

        if (!isFormD) {
            const body = Object.assign({}, entity.body, options.body);
            if (/^(get|GET|options|OPTIONS)$/i.test(options.method)) {
                for (let key in body) {
                    url.searchParams.append(key, body[key]);
                }
                delete options.body;
            } else {
                options.body = options.type === 'json' ? JSON.stringify(body) : body;
            }
        }

        delete options.param;
        delete options.query;
        options.url = url;

        return options;
    }

    throw this.toError(MSG.API_NOT_FOUND, name);
}


/** 
 * http(s) 请求管理
 * 
 * @method get
 * @method post
 * @method delete
 * @method put
 */
class RJar extends Jar {
    constructor() {
        super();
    }

  /**
   * 数据请求
   * @param name # {string}
   * @param options # {object}
   * @param hooks # {object}
   */
    async query(name, options, hooks) {
        options = getOptions.call(this, name, options);

        return await this.ajax(options, hooks);
    }
}

export default new RJar();