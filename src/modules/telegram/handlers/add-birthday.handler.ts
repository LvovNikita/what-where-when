import TelegramBot from 'node-telegram-bot-api';

import { ServiceWithLocator } from 'modules/serviceLocator';
import { BirthdayMessage } from '../classes/birthday-message.class';
import { Birthday } from 'modules/birthdays/classes/birthday.class';
import { BirthdayEntity } from 'modules/birthdays/entities/birthday.entity';

/**
 * Добавить день рождения
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function addBirthdayHandler(this: TelegramBot & ServiceWithLocator, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const id: number = msg.chat.id;
  const text: string = 'Формат события: ДД.ММ @имя_пользователя';
  const options: TelegramBot.SendMessageOptions = {
    reply_markup: {
      force_reply: true
    }
  }
  const { message_id } = await this.sendMessage(id, text, options);

  this.onReplyToMessage(id, message_id, async (msg: TelegramBot.Message) => {
    const { date, userHandler } = new BirthdayMessage(msg.text!);
    const birthday: Birthday = this.services.BirthdaysService.create.birthday(String(id), +date.month, +date.date, userHandler);
    const birthdayEntity: BirthdayEntity = this.services.BirthdaysService.create.birthdayEntity(birthday);
    await birthdayEntity.save()
    // TODO: уведомление о событии
    this.sendMessage(id, `Событие успешно создано`)
  });
};
