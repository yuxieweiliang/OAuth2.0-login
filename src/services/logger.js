var _logger = console;

export const logger = {
  setLogger: function (newLogger) {
    _logger = newLogger;
  }
};

var methods = 'log trace debug info warn error fatal'.split(' ');
methods.forEach(function (method) {
  logger[method] = function () {
    var oriLog = _logger[method] || _logger['log'];
    oriLog.apply(_logger, arguments);
  };
});
