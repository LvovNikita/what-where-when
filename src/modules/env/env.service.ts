import { DotenvConfigOptions, config } from 'dotenv'
import { logger } from '../core/logger'

/**
 * Сервис для работы с переменными окружения
 */
export class EnvService {
  static isInit = false;

  /**
   * Инициализировать переменные окружения:
   * сохранить значения из файла .env в объекте process.env
   * @param configOptions параметры конфигурации dotenv
   */
  static initEnvVariables (configOptions?: DotenvConfigOptions): void {
    if (!this.isInit){
      config(configOptions)
      this.isInit = true;
      logger.info('[EnvService] environment variables have been set')
    }
  }
}
