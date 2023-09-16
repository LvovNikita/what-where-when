import TelegramBot from 'node-telegram-bot-api'

// Типы:
import { Logger } from '../logger/index.mjs'

/**
 * Telegram-бот с логгером и доступом к сервисам
 */
export class CustomTelegramBot extends TelegramBot {
  /**
   * 
   * @param { string } token токен tg-бота 
   * @param {*} options свойства бота
   * @param { Logger } logger логгер
   * @param {*} services объект с инжектированными сервисами (аналог локатора служб)
   */
  constructor(token, options, logger, services) {
    super(token, options)
    this.logger = logger
    this.services = services
  }
}