const express = require('express');
const winston = require('winston');
const fluentTransport = require('fluent-logger').support.winstonTransport();
const app = express();

// Winston 로거 설정
const logger = winston.createLogger({
  level: 'debug', // winston의 기본 loglevel은 info이다.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new fluentTransport('apiserver.development', {
      host: 'fluentd',
      port: 24224,
      timeout: 3.0,
      reconnectInterval: 600000
    })
  ]
});

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      query: req.query,
      status: res.statusCode,
      duration,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  });

  next();
});

// 에러 로깅 미들웨어
app.use((err, req, res, next) => {
  logger.error('Server Error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body
  });
  
  res.status(500).json({ error: 'Internal Server Error' });
});

// 라우트 예제
app.get('/api/test', (req, res) => {
  logger.info('Test endpoint called', {
    query: req.query
  });
  
  res.json({ message: 'Success' });
});

const PORT = 3330;
app.listen(PORT, () => {
  logger.debug('Test debug message', { test: 'debug' });
  logger.info('Test info message', { test: 'info' });
  logger.error('Test error message', { test: 'error' });
});