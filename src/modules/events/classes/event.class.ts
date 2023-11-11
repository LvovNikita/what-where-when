import { randomUUID } from 'node:crypto'
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import { EventType } from '../../../libs/enums/event-type.enum'
import { logger } from '../../../modules/core/logger'
import { DateFormat } from '../../../libs/enums/date-format.enum'
import { Week } from '../types/week.type'
import { IDateObject } from 'libs/interfaces/date-object.interface'
import { Uuid } from 'libs/types/uuid.type'
import { PostgresDate } from 'libs/types/postgres-date.type'

dayjs.extend(isoWeek)

/**
 * Событие
 */
export class Event {
  public id: Uuid
  public year?: number | null
  public month?: number | null
  public date?: number | null
  public week?: Week | null
  public day?: number | null

  /**
   *
   */
  constructor(
    public subject: string,
    public type: EventType,
    public subscriberId: string,
    dateObject: IDateObject
  ) {
    this.id = randomUUID();
    Object.assign(this, dateObject)
  }

  /**
   * Информация о событии в виде строки
   * @returns информация о событии в соответствии с шаблоном
   */
  public get template(): string {
    return `${this.nearestDate} – ${this.subject}`
  }

  /**
   * Получить ближайшую дата события
   * @returns дата в формате YYYY-MM-DD
   */
  public get nearestDate(): PostgresDate | null {
    const eventTypeToGetNearestDateFn = new Map<EventType, () => null | Dayjs>()
    eventTypeToGetNearestDateFn.set(EventType.ANNUAL, this.annualEventNearestDate.bind(this));
    eventTypeToGetNearestDateFn.set(EventType.MONTHLY, this.monthlyEventNearestDate.bind(this));
    eventTypeToGetNearestDateFn.set(EventType.WEEKLY, this.weeklyEventNearestDate.bind(this));
    eventTypeToGetNearestDateFn.set(EventType.ONE_TIME, this.oneTimeEventNearestDate.bind(this));
    eventTypeToGetNearestDateFn.set(EventType.SPECIAL, this.specialEventNearestDate.bind(this));

    const getNearestDateFn = eventTypeToGetNearestDateFn.get(this.type);
    if (typeof getNearestDateFn === 'function') {
      const nearestDate: Dayjs | null = getNearestDateFn();
      if (nearestDate) {
        return nearestDate.format(DateFormat.POSTGRES)
      } else {
        return null
      }
    } else {
      logger.warn(`[class Event] no getNearestDate function for event of type ${this.type}`)
      return null
    }
  }

  /**
   * Получить timestamp текущей даты
   * @returns timestamp текущей даты
   */
  private get currentDate(): number {
    return Date.now()
  }

  /**
   * Вернуть объект даты DayJS ближайшего ежегодного события 
   * @returns дату ближайшего ежегодного события
   */
  private annualEventNearestDate(): Dayjs | null {
    if (this.month && this.date) {
      const nearestDate = dayjs()
        .month(this.month - 1)
        .date(this.date)
      if (nearestDate.isBefore(this.currentDate)) {
        return nearestDate.add(1, 'year')
      }
      return nearestDate
    } else {
      logger.warn(`[class Event] incorrect event data ${this}`)
      return null
    }
  }

  /**
   * Вернуть объект даты DayJS ближайшего ежемесячного события 
   * @returns дату ближайшего ежемесячного события
   */
  private monthlyEventNearestDate(): Dayjs | null {
    if (this.date) {
      const nearestDate = dayjs()
        .date(this.date)
      if (nearestDate.isBefore(this.currentDate)) {
        return nearestDate
          .add(1, 'month')
          .date(this.date)
      }
      return nearestDate
    } else {
      logger.warn(`[class Event] incorrect event data ${this}`)
      return null
    }
  }

  /**
   * Вернуть объект даты DayJS ближайшего еженедельного события 
   * @returns дату ближайшего еженедельного события
   */
  private weeklyEventNearestDate(): Dayjs | null {
    if (this.day) {
      const nearestDate = dayjs()
        .startOf('week')
        .isoWeekday(this.day)
      if (nearestDate.isBefore(this.currentDate)) {
        return nearestDate.add(1, 'week')
      }
      return nearestDate
    } else {
      logger.warn(`[class Event] incorrect event data ${this}`)
      return null
    }
  }

  /**
   * Вернуть объект даты DayJS ближайшего разового события 
   * @returns дату ближайшего разового события
   */
  private oneTimeEventNearestDate(): Dayjs | null {
    if (this.year && this.month && this.date) {
      const nearestDate = dayjs()
        .year(this.year)
        .month(this.month)
        .date(this.date)
      if (nearestDate.isBefore(this.currentDate)) {
        return null
      }
      return nearestDate
    } else {
      logger.warn(`[class Event] incorrect event data ${this}`)
      return null
    }
  }

  /**
   * Вернуть объект даты DayJS ближайшего настраиваемого события 
   * @returns дату ближайшего настраиваемого события
   */
  private specialEventNearestDate(): Dayjs  | null {
    if (this.month && this.week && this.day) {
      let nearestDate = dayjs().month(this.month - 1)

      if(nearestDate.month() < dayjs().month()) {
        nearestDate = nearestDate.add(1, 'year')
      }

      nearestDate = nearestDate.startOf('month')

      const isFirstWeek = [1, 'first'].includes(this.week)
      const isLastWeek = [5, 'last'].includes(this.week)
      
      if (isFirstWeek) {
        if (this.day < nearestDate.isoWeekday()) {
          nearestDate = nearestDate.add(1, 'week').startOf('week')
        }
      } else if (isLastWeek) {
        nearestDate = nearestDate.endOf('month').startOf('week')
        if (this.day > nearestDate.isoWeekday()) {
          nearestDate = nearestDate.subtract(1, 'week').startOf('week')
        }
      } else if (typeof this.week === 'number') {
        nearestDate = nearestDate.add(this.week - 1, 'weeks').startOf('week').isoWeekday(this.day)
      }

      nearestDate = nearestDate.isoWeekday(this.day)

      return nearestDate
    } else {
      logger.warn(`[class Event] incorrect event data ${this}`)
      return null
    }
  }
}
