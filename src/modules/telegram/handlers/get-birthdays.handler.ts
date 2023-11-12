import { BirthdayList } from './../../../modules/birthdays/classes/birthday-list.class';
import { BirthdayEntity } from './../../../modules/birthdays/entities/birthday.entity';
import { ServiceLocator } from './../../../modules/serviceLocator';
import TelegramBot from 'node-telegram-bot-api';

/**
 * Получить список дней рождения
 * @param msg сообщение
 * @param match результат применения регулярного выражения к тексту
 */
export async function getBirthdaysHandler(this: TelegramBot & { services: ServiceLocator }, msg: TelegramBot.Message, match: RegExpExecArray | null) {
  const { id } = msg.chat;
  const birthdayEntities: BirthdayEntity[] = await this.services.BirthdaysService.findBySubscriberId(String(id));
  const birthdays = birthdayEntities.map((birthdayEntity: BirthdayEntity) => this.services.BirthdaysService.create.birthday(
    birthdayEntity.subscriberId,
    birthdayEntity.month,
    birthdayEntity.date,
    birthdayEntity.userHandler
  ))
  const birthdaysList: BirthdayList = this.services.BirthdaysService.create.birthdayList(birthdays)
  this.sendMessage(id, birthdaysList.template);
}
