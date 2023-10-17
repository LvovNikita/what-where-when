import TelegramBot from 'node-telegram-bot-api';

import { EventEntity } from './../../events/entities/event.entity';
import { Event } from './../../events/classes/event.class'
import { EventList } from './../../events/classes/event-list.class';
import { serviceLocator } from './../../serviceLocator';

const { EventsService } = serviceLocator

/**
 * Получить список событий
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function getEventsHandler(this: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat
  const eventEntities: EventEntity[] = await EventsService.findBySubscriberId(String(id))
  const events: Event[] = eventEntities.map((event: EventEntity) => EventsService.create.event(event)); 
  const eventList: EventList = EventsService.create.eventList(events)
  await this.sendMessage(id, eventList.template)
}
