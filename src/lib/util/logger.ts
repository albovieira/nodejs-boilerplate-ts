import { Logger } from 'winston';
import { LoggerFactory, ConfigProvider, LoggerTypes } from 'logger-dispatcher';

export default function createLogger(): Logger {
  const consoleProvider: ConfigProvider = {
    name: LoggerTypes.CONSOLE,
    enabled: true,
    config: {
      level: 'info',
    },
  };
  const logger = LoggerFactory.create(consoleProvider.name, consoleProvider.config || {});
  return logger;
}
