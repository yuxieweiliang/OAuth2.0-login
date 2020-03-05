import BASE from './base';
import setDescriptor from './set-descriptor';

import request from './request';

Object.defineProperties(BASE, {
  request: setDescriptor(request),
});

if(typeof window !== "undefined") {
  window.services = BASE;
}

export default BASE;
