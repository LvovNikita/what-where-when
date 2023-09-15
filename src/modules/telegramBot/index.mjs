import TelegramBot from 'node-telegram-bot-api'

/**
 * Класс Telegram-бота, имеющего доступ к базе данных
 */
export class CustomTelegramBot extends TelegramBot {
  constructor(token, options, logger, services) {
    super(token, options)
    this.logger = logger
    this.services = services
  }
}