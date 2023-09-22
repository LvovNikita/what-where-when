import { Logger } from '../logger/index.mjs'
import { CustomTelegramBot } from '../telegramBot/index.mjs'
import { EventEntity } from '../eventsService/entities/event.entity.mjs'
import { EventsService } from '../eventsService/index.mjs' 
import { config } from '../configuration/index.mjs'
import { dataSource } from '../database/data-source.mjs'
import { EventNotificationService } from '../eventNotificationsService/index.mjs'
import { EventNotificationEntity } from '../eventNotificationsService/entities/eventNotification.entity.mjs'

/**
 * Telegram-бот What-Where-When
 */
export const whatWhereWhenTgBot = new CustomTelegramBot(
  config.TELEGRAM_BOT_TOKEN,
  {
    polling: true,
  },
  new Logger('whatWhereWhenTgBot'),
  {
    eventsService: new EventsService(dataSource, EventEntity),
    eventNotificationsService: new EventNotificationService(dataSource, EventNotificationEntity)
  }
)