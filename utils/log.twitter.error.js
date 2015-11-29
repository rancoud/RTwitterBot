global.logTwitterError = function logTwitterError(error) {
  log.error('RTBot', 'getRateLimit | code: %d | message: "%s"', error[0]  .code, error[0].message);
};
