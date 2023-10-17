import TelegramBot from 'node-telegram-bot-api';
import { chooseEventTypeKeyboard } from '../data/choose-event-type-keyboard';

/**
 * Добавить событие
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export function addEventHandler(this: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id, username } = msg.chat
  const text = `@${username} Какое событие запланируем?`
  const options: TelegramBot.SendMessageOptions = { 
    reply_markup: { 
      inline_keyboard: chooseEventTypeKeyboard 
    }
  }
  this.sendMessage(id, text, options)
}
