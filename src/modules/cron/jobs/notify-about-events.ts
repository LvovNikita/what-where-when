import dayjs, { Dayjs } from 'dayjs';
import { serviceLocator } from './../../serviceLocator';
import { whatWhereWhenTgBot } from './../../telegram';
import { EventEntity } from './../../events/entities/event.entity';
import { EventType } from './../../../libs/enums/event-type.enum';
import { In } from 'typeorm';

/**
 * Отправиить уведомление о событии
 */
export async function notifyAboutEvents() {
  const currentDate: Dayjs = dayjs()
  const month: number = currentDate.get('month') + 1
  const date: number = currentDate.get('date')

  const events: any = [];

  const annualEvents: EventEntity[] = await serviceLocator.EventsService.find({
    where: {
      type: In([EventType.ANNUAL]),
      month,
      date
    }
  })

  // TODO: остальные типы событий
  // type: In([EventType.ANNUAL, EventType.MONTHLY, EventType.ONE_TIME, EventType.SPECIAL, EventType.WEEKLY]),
  // ежегодные — Д М
  // ежемесячно — Д
  // еженедельно - номер дня недели
  // разовые Д М Г
  // настраиваемые — ...

  events.push(...annualEvents)

  console.log(events)

  for (const event of events) {
    whatWhereWhenTgBot.sendMessage(event.subscriberId, `Напоминаю о событии: ${event.subject}`)
  }
}
