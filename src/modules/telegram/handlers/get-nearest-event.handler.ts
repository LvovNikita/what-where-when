import TelegramBot from 'node-telegram-bot-api';

import { EventEntity } from './../../events/entities/event.entity';
import { Event } from './../../events/classes/event.class'
import { EventList } from './../../events/classes/event-list.class';
import { ServiceWithLocator } from './../../serviceLocator';

/**
 * Получить ближайшее событие
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function getNearestEventHandler(this: TelegramBot & ServiceWithLocator, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat
  const eventEntities: EventEntity[] = await this.services.EventsService.findBySubscriberId(String(id))
  const events: Event[] = eventEntities.map((event: EventEntity) => this.services.EventsService.create.event(event.subject, event.type, event.subscriberId, event.year, event.month, event.date, event.week, event.day))
  const eventList: EventList = this.services.EventsService.create.eventList(events)
  await this.sendMessage(id, eventList.nearestEvent.template)
}
