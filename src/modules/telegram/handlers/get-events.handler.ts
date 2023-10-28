import TelegramBot from 'node-telegram-bot-api';

import { EventEntity } from './../../events/entities/event.entity';
import { Event } from './../../events/classes/event.class'
import { EventList } from './../../events/classes/event-list.class';
import { ServiceWithLocator } from './../../serviceLocator';


/**
 * Получить список событий
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function getEventsHandler(this: TelegramBot & ServiceWithLocator, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat
  const eventEntities: EventEntity[] = await this.services.EventsService.findBySubscriberId(String(id))
  const events: Event[] = eventEntities.map((event: EventEntity) => this.services.EventsService.create.event(
    event.subject, 
    event.type, 
    event.subscriberId, 
    {
      year: event.year,
      month: event.month,
      date: event.date,
      day: event.day,
      week: event.week
    }
  ))
  const eventList: EventList = this.services.EventsService.create.eventList(events)
  await this.sendMessage(id, eventList.template)
}
