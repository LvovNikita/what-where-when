import dayjs, { Dayjs } from 'dayjs'
import { EventType } from '../../../libs/enums/event-type.enum'
import { logger } from '../../../modules/core/logger'
import { EventEntity } from '../entities/event.entity'
import { randomUUID } from 'crypto'
import { DateFormat } from '../../../libs/enums/date-format.enum'

/**
 * Событие
 */
export class Event extends EventEntity {
  /**
   * @param createEventDto DTO создания объекта
   */
  constructor(eventDto: EventEntity) {
    super(eventDto)
    this.id = randomUUID();
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
  public get nearestDate(): string | null {
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
        .day(this.day)
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
      let nearestDate = dayjs()
        .month(this.month - 1)
        .startOf('month')
      if (typeof this.week === 'number') {
        nearestDate = nearestDate.add(this.week - 1, 'weeks')
      }
      // Если 'first' — не делать ничего (мы уже в начале месяца)
      else if (this.week === 'last') {
        nearestDate = nearestDate
          .endOf('month')
          .subtract(6, 'days') // чтобы не попасть на тот же день недели
      }
      nearestDate = nearestDate.day(this.day)
      if (nearestDate.isBefore(this.currentDate)) {
        return nearestDate.add(1, 'year')
      }
      return nearestDate
    } else {
      logger.warn(`[class Event] incorrect event data ${this}`)
      return null
    }
  }
}

// В П В С Ч П С
// 1 2 3 4 5 6 7
