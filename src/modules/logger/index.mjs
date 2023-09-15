import { createLogger, format, transports } from 'winston';

/**
 * Класс логгера на базе Winston
 */
export class Logger {
  #logger = createLogger({
    transports: [
      new transports.Console({        
        format: format.combine(
          format.splat(), // интерполяция
          format.colorize(),
          format.simple(),
        )
      })
    ]
  })

  #log(level, ...args) {
    args[0] = `[${this.serviceName}] ${args[0]}`
    this.#logger.log(level, ...args)
  }

  constructor (serviceName) {
    this.serviceName = serviceName ?? ''
  }

  info(...args) {
    this.#log('info', ...args);
  }

  warn(...args) {
    this.#log('warn', ...args);
  }

  error(...args) {
    this.#log('error', ...args);
  }
}
