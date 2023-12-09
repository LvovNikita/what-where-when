import { IDateObject } from 'libs/interfaces/date-object.interface'
import { EventType } from '../../../libs/enums/event-type.enum'
import { Week } from 'modules/events/types/week.type'

/**
 * Сообщение с информацией о создаваемом событии
 */
export class EventMessage {
  constructor(public message: string, public type: EventType) {}

  /**
   * 
   */
  get subject(): string {
    const subjectStart: number = this.message.indexOf(' ') + 1
    return this.message.substring(subjectStart)
  }

  /**
   * 
   */
  get date(): IDateObject {
    const dateEnd: number = this.message.indexOf(' ')
    const dateArr: string[] = this.message.substring(0, dateEnd).split(/\.|:/)
    const date: IDateObject = { 
      year: null, 
      month: null, 
      date: null, 
      day: null, 
      week: null 
    }

    switch (this.type) {
      case `${EventType.ANNUAL}`:   [date.date, date.month] = [+dateArr[0], +dateArr[1]]; break
      case `${EventType.MONTHLY}`:  date.date = +dateArr[0]; break
      case `${EventType.WEEKLY}`:   date.day = +dateArr[0]; break
      case `${EventType.ONE_TIME}`: [date.date, date.month, date.year] = [+dateArr[0], +dateArr[1], +dateArr[2]]; break;
      case `${EventType.SPECIAL}`:  [date.week, date.day, date.month] = [(Number.isInteger(dateArr[0]) ? +dateArr[0] : dateArr[0]) as Week, +dateArr[1], +dateArr[2]]; break;
      default: break;
    }

    return date
  }
}
