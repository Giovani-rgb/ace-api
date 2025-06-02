const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new transports.Console({ format: combine(colorize(), customFormat) }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ],
});

module.exports = logger;
