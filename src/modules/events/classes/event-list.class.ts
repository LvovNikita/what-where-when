import { Event } from './event.class'
import { compareEventsNearestDates } from '../helpers/compare-events-nearest-dates.helper';

/**
 * Список событий
 */
export class EventList {
  public events: Event[];
  private noUpcomingEventsMessage = 'Нет предстоящих событий'

  constructor(events: Event[]) {  
    this.events = events.sort(compareEventsNearestDates)
  }

  /**
   * Получить информацию о событиях в виде списка (текстового)
   * @returns информацию о событиях в виде списка
   */
  get template() {
    return this.events.reduce((acc, curr) => acc + curr.template + '\n' , '') || this.noUpcomingEventsMessage
  }

  /**
   * Вернуть ближайшее событие (экземпляр класса Event)
   * @returns ближайшее событие
   */
  get nearestEvent() {
    return this.events[0] || this.noUpcomingEventsMessage
  }
}
