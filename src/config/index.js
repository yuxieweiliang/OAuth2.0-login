import pa from 'path'
import { isProd } from '../services/utils'
import config from '../../config'

export default {
  host: '127.0.0.1',
  port: 8063,
  domain: 'api.domain.com',
  protocol: "http",
  certificate: {
    // if you use Https or http2, you must be has the options
  },
  static: {
    // static resoures options
    root: isProd ? config.prod.static : pa.join(__dirname, '../../public/asset')
  },

  logger: {
    name: 'program-api',
    level: 'error'
  }
}
