import { Loggable } from '../core/loggable.class.mjs'

/**
 * Класс HTTP-сервера
 */
export class HttpServer extends Loggable {
  constructor (app, logger) {
    super(logger)
    this.app = app
  }

  listen(port) {
    this.app.listen(port)
    this.logger.info('.listen(): server is running on port %s', port)
  }
}
