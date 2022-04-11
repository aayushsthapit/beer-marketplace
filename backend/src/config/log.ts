const logDir = process.env.LOGGING_DIR || 'logs';
const logLevel = process.env.LOGGING_LEVEL || 'info';
const tsFormat = () => new Date().toISOString();

export const config = {
  file: {
    level: logLevel,
    filename: `${logDir}/%DATE%-debug.log`,
    maxFiles: '14d',
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    timestamp: tsFormat
  },
  console: {
    level: 'info',
    colorize: true
  }
};
