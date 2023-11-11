import TelegramBot from 'node-telegram-bot-api';

import { getEventsList } from '../helpers/get-events-list.helper';
import { ServiceWithLocator } from 'modules/serviceLocator/types/service-with-locator.type';


/**
 * Получить список событий
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function getEventsHandler(this: TelegramBot & ServiceWithLocator, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat
  const eventList = await getEventsList(id);
  await this.sendMessage(id, eventList.template)
}
