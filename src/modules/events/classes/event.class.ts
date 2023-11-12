import { randomUUID } from 'node:crypto'
import { EventType } from '../../../libs/enums/event-type.enum'
import { logger } from '../../../modules/core/logger'
import { DateFormat } from '../../../libs/enums/date-format.enum'
import { Week } from '../types/week.type'
import { IDateObject } from 'libs/interfaces/date-object.interface'
import { Uuid } from 'libs/types/uuid.type'
import { PostgresDate } from 'libs/types/postgres-date.type'
import { ServiceLocator, serviceLocator } from './../../../modules/serviceLocator'
import { Dayjs } from 'dayjs'

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
  private services: ServiceLocator = serviceLocator

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
    let nearestDate: Dayjs | null = null;

    switch (this.type) {
      case EventType.ANNUAL: nearestDate = this.services.DateTimeService.annualEventGenerator(this.month!, this.date!).next().value; break;
      case EventType.MONTHLY: nearestDate = this.services.DateTimeService.monthlyEventGenerator(this.date!).next().value; break;
      case EventType.WEEKLY: nearestDate = this.services.DateTimeService.weeklyEventGenerator(this.day!).next().value; break;
      case EventType.ONE_TIME: nearestDate = this.services.DateTimeService.oneTimeEventGenerator(this.year!, this.month!, this.date!).next().value; break;
      case EventType.SPECIAL: nearestDate = this.services.DateTimeService.specialEventGenerator(this.month!, this.week!, this.day!).next().value; break;
      default: break;
    }

    if (nearestDate?.isValid()) {
      return nearestDate.format(DateFormat.POSTGRES)
    } else {
      logger.warn(`[class Event] incorrect event data or event type ${this}`)
      return null
    }
  }
}
