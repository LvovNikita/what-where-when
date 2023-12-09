import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'
import { Equal, FindOperator, FindOptionsWhere, In } from 'typeorm';
import { serviceLocator } from './../../serviceLocator';
import { whatWhereWhenTgBot } from './../../telegram';
import { EventEntity } from './../../events/entities/event.entity';
import { EventType } from './../../../libs/enums/event-type.enum';
import { DateTimeService } from './../../datetime';
import { Week } from './../../events/types/week.type';
import { logger } from './../../core/logger';

dayjs.extend(isoWeek)

/**
 * Отправиить уведомление о событии
 */
export async function notifyAboutEvents() {
  const currentDate: Dayjs = dayjs()
  const year: number = currentDate.get('year')
  const month: number = currentDate.get('month') + 1
  const date: number = currentDate.get('date')
  const day: number = currentDate.isoWeekday()
  const currentWeek: Week = DateTimeService.weekOfMonth(currentDate) as Week
  let weekClause: FindOperator<Week>;

  if (currentWeek === 'first') {
    weekClause = In([1, 'first'])
  } else if (currentWeek === 'last') {
    weekClause = In(['last', DateTimeService.weeksInMonth(month) ])
  } else {
    weekClause = Equal(currentWeek)
  }

  const events: EventEntity[] = [];

  const getEvents = async (where: FindOptionsWhere<EventEntity>): Promise<EventEntity[]> => {
    return serviceLocator.EventsService.find({ where })
  }

  events.push(
    ...await getEvents({ type: EventType.ANNUAL, month, date }), 
    ...await getEvents({ type: EventType.MONTHLY, date }),
    ...await getEvents({ type: EventType.ONE_TIME, date, month, year }),
    ...await getEvents({ type: EventType.WEEKLY, day }),
    ...(await getEvents({ type: EventType.SPECIAL, day, month, week: weekClause }))
  )

  for (const event of events) {
    whatWhereWhenTgBot.sendMessage(event.subscriberId, `Напоминаю о событии: ${event.subject}`)
  }

  logger.info('[Cron] job notifyAboutEvents has been run')
}
