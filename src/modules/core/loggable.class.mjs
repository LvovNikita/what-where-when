/**
 * Экземпляр логируемого класса
 */
export class Loggable {
  constructor(logger) {
    this.logger = logger ?? console
  }
}
