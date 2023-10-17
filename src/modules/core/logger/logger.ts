import { Logger, pino, LoggerOptions } from 'pino'

/** Параметры логгера */
const options: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
}

/** Экземпляр логгера */
export const logger: Logger = pino(options)
