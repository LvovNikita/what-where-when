import TelegramBot from 'node-telegram-bot-api';

import { EventType } from '../../../libs/enums/event-type.enum';
import { EventMessage } from '../classes/event-message.class';
import { Event } from './../../events/classes/event.class'
import { EventEntity } from './../../events/entities/event.entity';
import { ServiceWithLocator } from './../../../modules/serviceLocator/types/service-with-locator.type';

/**
 * Создать событие
 * @param msg сообщение
 * @param data команда, отправленная боту
 */
export async function createEventHandler(this: TelegramBot & ServiceWithLocator, msg: TelegramBot.Message | undefined, data: string) {
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
    const isMessageCorrect: boolean = this.services.ValidationService.verifyString(msg.text || '', EventType.BIRTHDAY);
    if (!isMessageCorrect) return this.sendMessage(id, `Некорректный формат события`);
    const eventType: EventType = data.replace('/', '') as EventType
    const { subject, type, date } = new EventMessage(msg.text!, eventType)
    const event: Event = this.services.EventsService.create.event(subject, type, String(id), date)
    const eventEntity: EventEntity = this.services.EventsService.create.eventEntity(event);
    await eventEntity.save();
    this.sendMessage(id, `Событие ${event.subject} успешно создано`)
  })
}
