import { createLogger, format, transports } from 'winston';

/**
 * Логгер на базе Winston
 */
export class Logger {
  #logger = createLogger({
    transports: [
      new transports.Console({        
        format: format.combine(
          format.splat(), // поддержка интерполяции
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

  /**
   * Вывести информационное сообщение
   * @param { string[] } args 
   */
  info(...args) {
    this.#log('info', ...args);
  }

  /**
   * Вывести предупреждение
   * @param { string[] } args 
   */
  warn(...args) {
    this.#log('warn', ...args);
  }

  /**
   * Вывести сообщение об ошибке
   * @param { string[] } args 
   */
  error(...args) {
    this.#log('error', ...args);
  }
}
