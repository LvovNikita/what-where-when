// Types:
import { Event } from './event.class.mjs';

/**
 * Список событий
 */
export class EventList {
  /**
   * @param { Event } events 
   */
  constructor(events) {
    /**
     * Сравнить события лексикографически по ближайшей дате
     * @param { Event } a 
     * @param { Event } b 
     * @returns { number } результат сравнения
     */
    const compareLexicographicallyByNearestDate = (a, b) => a.nearestDate.localeCompare(b.nearestDate) 
    this.events = events.sort(compareLexicographicallyByNearestDate)
  }

  /**
   * Получить информацию о событиях в виде списка
   * @returns { string }
   */
  get template() {
    return this.events.reduce((acc, curr) => acc + curr.template + '\n' , '')
  }

  /**
   * Вернуть ближайшее событие
   * @returns { Event }
   */
  get closestEvent() {
    return this.events[0]
  }
}