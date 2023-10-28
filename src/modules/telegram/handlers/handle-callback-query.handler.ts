import TelegramBot from 'node-telegram-bot-api';

import { logger } from './../../core/logger';
import { createEventHandler } from './create-event.handler';
import { EventType } from '../../../libs/enums/event-type.enum';
import { ServiceWithLocator } from 'modules/serviceLocator';

/**
 * Обработать команду, отправленную через обратный вызов (нажатия на кнопку, например)
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function handleCallbackQuery(this: TelegramBot & ServiceWithLocator, query: TelegramBot.CallbackQuery) {
  const { data, message } = query
  
  switch (data) {
    case `/${EventType.ANNUAL}`: 
    case `/${EventType.MONTHLY}`:
    case `/${EventType.WEEKLY}`:
    case `/${EventType.ONE_TIME}`:
    case `/${EventType.SPECIAL}`:
      createEventHandler.call(this, message, data as EventType); break
    default: 
      logger.warn(`[WhatWhenWhereBot] no callback query handler for command ${data}`); break
  }
}
