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
 * Отправить уведомление о событиях за неделю до
 */
export async function notifyAboutEventsWeekBefore() {
  const futureDate: Dayjs = dayjs().add(1, 'week')
  const year: number = futureDate.get('year')
  const month: number = futureDate.get('month') + 1
  const date: number = futureDate.get('date')
  const day: number = futureDate.isoWeekday()
  const futureWeek: Week = DateTimeService.weekOfMonth(futureDate) as Week
  let weekClause: FindOperator<Week>;

  if (futureWeek === 'first') {
    weekClause = In([1, 'first'])
  } else if (futureWeek === 'last') {
    weekClause = In(['last', DateTimeService.weeksInMonth ])
  } else {
    weekClause = Equal(futureWeek)
  }

  const events: EventEntity[] = [];

  const getEvents = async (where: FindOptionsWhere<EventEntity>): Promise<EventEntity[]> => {
    return serviceLocator.EventsService.find({ where })
  }

  events.push(
    ...await getEvents({ type: EventType.ANNUAL, month, date }), 
    ...await getEvents({ type: EventType.ONE_TIME, date, month, year }),
    ...(await getEvents({ type: EventType.SPECIAL, day, month, week: weekClause }))
  )

  for (const event of events) {
    whatWhereWhenTgBot.sendMessage(event.subscriberId, `Напоминаю о событии, которое запланировано через неделю: ${event.subject}`)
  }

  logger.info('[Cron] job notifyAboutEventsWeekVefore has been run')
}
