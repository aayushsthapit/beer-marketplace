import fs from 'fs';
import winston, { format } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { config } from '../config/log';
const { combine, timestamp, printf, colorize } = format;

const logDir = process.env.LOGGING_DIR || 'logs';

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf(info => info.message);

const infoFormat = format(info => {
  const levelInfo = info.level.toUpperCase();

  info.message = `${info.timestamp} [${colorize().colorize(info.level, levelInfo)}]: ${info.message}`;
  return info;
});

const logFormat = combine(timestamp(), infoFormat(), myFormat);

// instantiate a new Winston Logger with the settings defined above
export const logger = winston.createLogger({
  format: logFormat,
  transports: [new DailyRotateFile(config.file), new winston.transports.Console(config.console)],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
  write(message: string) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message.toString().trim());
  }
};

export default logger;
