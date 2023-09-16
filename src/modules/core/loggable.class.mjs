// Types:
import { Logger } from '../logger/index.mjs';

/**
 * Логируемый объект
 */
export class Loggable {
  /**
   * @param { Logger } logger объект логгера 
   */
  constructor(logger) {
    this.logger = logger ?? console
  }
}
