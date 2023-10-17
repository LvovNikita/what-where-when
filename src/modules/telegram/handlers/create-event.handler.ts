import TelegramBot from 'node-telegram-bot-api';

import { EventType } from '../../../libs/enums/event-type.enum';
import { EventMessage } from '../classes/event-message.class';
import { serviceLocator } from './../../serviceLocator';
import { Event } from './../../events/classes/event.class'
import { NotificationType } from './../../../libs/enums/notification-type.enum';
import { randomUUID } from 'crypto';
import { EventEntity } from './../../events/entities/event.entity';
import { NotificationEntity } from 'modules/notifications/entities/notification.entity';

const { EventsService, NotificationsService } = serviceLocator

/**
 * Создать событие
 * @param msg сообщение
 * @param data команда, отправленная боту
 */
export async function createEventHandler(this: TelegramBot, msg: TelegramBot.Message | undefined, data: string) {
  const id: number = msg!.chat.id
  
  const text: string | undefined = new Map([
    [`/${EventType.ANNUAL}`, 'Формат события: ДД.ММ Название'],
    [`/${EventType.MONTHLY}`, 'Формат события: ДД Название'],
    [`/${EventType.WEEKLY}`, 'Формат события: 1–7 Название, где число — номер дня недели'],
    [`/${EventType.ONE_TIME}`, 'Формат события: ДД.ММ.ГГГГ Название'],
    [`/${EventType.SPECIAL}`, 'Формат события: 3:2:04 = третий вторник апреля, вместо номера недели можно использовать first и last']
  ]).get(data)

  const options: TelegramBot.SendMessageOptions = { 
    reply_markup: { 
      force_reply: true 
    } 
  }

  const { message_id } = await this.sendMessage(id, text!, options)
  
  this.onReplyToMessage(id, message_id, async (msg: TelegramBot.Message) => {
    const type: EventType = data.replace('/', '') as EventType
    const eventMessage: EventMessage = new EventMessage(msg.text!, type)
    const event: Event = EventsService.create
      .event({
        id: randomUUID(),
        subject: eventMessage.subject,
        subscriberId: String(id),
        type: eventMessage.type,
        ...eventMessage.date
      })
    const eventEntity: EventEntity = new EventEntity(event);
    await eventEntity.save();
    const nearestDate = event.nearestDate;
    if (nearestDate) {
      const notification: NotificationEntity = NotificationsService.create.notification(NotificationType.EVENT, event.nearestDate, event.id)
      await notification.save()
    }
    this.sendMessage(id, `Событие ${event.subject} успешно создано`)
  })
}
