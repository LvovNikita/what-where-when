import TelegramBot from 'node-telegram-bot-api';

/**
 * Получить список дней рождения
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export function getBirthdaysHandler(this: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat;
  // TODO:
  this.sendMessage(id, 'UNDER CONSTRUCTION')
}
