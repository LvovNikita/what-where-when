import { BirthdayEntity } from 'modules/birthdays/entities/birthday.entity';
import { ServiceLocator } from 'modules/serviceLocator';
import TelegramBot from 'node-telegram-bot-api';

/**
 * Получить список дней рождения
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function getBirthdaysHandler(this: TelegramBot & { services: ServiceLocator }, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat;
  const birthdays: BirthdayEntity[] = await this.services.BirthdaysService.findBySubscriberId(String(id));
  // TODO: вывод в нормальном формате
  this.sendMessage(id, JSON.stringify(birthdays));
}
