import dayjs, { Dayjs } from 'dayjs';
import { BirthdayEntity } from './../../birthdays/entities/birthday.entity';
import { serviceLocator } from './../../serviceLocator';
import { whatWhereWhenTgBot } from './../../telegram';
import { logger } from './../../core/logger';

/**
 * Отправиить уведомление о дне рождения
 */
export async function notifyAboutBirthdays() {
  const currentDate: Dayjs = dayjs()
  const month: number = currentDate.get('month') + 1
  const date: number = currentDate.get('date')

  const birthdays: BirthdayEntity[] = await serviceLocator.BirthdaysService.find({
    where: {
      month,
      date
    } 
  })

  for (const birthday of birthdays) {
    whatWhereWhenTgBot.sendMessage(birthday.subscriberId, `С днём рождения, ${birthday.userHandler}! 🥳`)
  }

  logger.info('[Cron] job notifyAboutBirthdays has been run')
}
