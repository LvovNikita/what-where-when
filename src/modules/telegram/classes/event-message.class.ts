import { EventType } from '../../../libs/enums/event-type.enum'

/**
 * Сообщение с информацией о создаваемом событии
 */
export class EventMessage {
  constructor(public message: string, public type: EventType) {}

  get subject(): string {
    const subjectStart: number = this.message.indexOf(' ') + 1
    return this.message.substring(subjectStart)
  }

  get date() {
    const dateEnd: number = this.message.indexOf(' ')
    const dateArr: string[] = this.message.substring(0, dateEnd).split(/\.|:/)
    const date: any = { 
      year: null, 
      month: null, 
      date: null, 
      day: null, 
      week: null 
    }

    switch (this.type) {
      case `${EventType.ANNUAL}`:   [date.date, date.month] = dateArr; break
      case `${EventType.MONTHLY}`:  [date.date] = dateArr; break
      case `${EventType.WEEKLY}`:   [date.day] = dateArr; break
      case `${EventType.ONE_TIME}`: [date.date, date.month, date.year] = dateArr; break;
      case `${EventType.SPECIAL}`:  [date.week, date.day, date.month] = dateArr; break;
      default: break;
    }

    return date
  }
}
