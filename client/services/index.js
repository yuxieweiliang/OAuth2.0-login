import BASE from './base';
import setDescriptor from './set-descriptor';

import request from './request';

Object.defineProperties(BASE, {
  request: setDescriptor(request),
});

window.services = BASE;
export default BASE;
