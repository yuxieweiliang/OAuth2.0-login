
import './disable-antd.tab-fastkey';
import setDescriptor from './set-descriptor';

const BASE = Object.create(null);
const APP_VERSION = JSON.stringify('pkg.version');
const APP_AUTHOR = JSON.stringify('pkg.author');
const APP_NAME = JSON.stringify('pkg.name');
const APP_ENV = JSON.stringify('utils.env');
const APP_MODE =JSON.stringify('utils.client' ? 'desktop' : 'browser');
const APP_PLATFORM = JSON.stringify('win');

Object.defineProperties(BASE, {
    version: setDescriptor(APP_VERSION),
    author: setDescriptor(APP_AUTHOR),
    name: setDescriptor(APP_NAME),
    env: setDescriptor(APP_ENV),
    mode: setDescriptor(APP_MODE),
    platform: setDescriptor(APP_PLATFORM),
    isDev: setDescriptor(APP_ENV !== 'production'),
    isDesktop: setDescriptor(APP_MODE === 'desktop')
});

export default BASE;
