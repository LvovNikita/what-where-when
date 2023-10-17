import { Event } from './../classes/event.class'

/**
 * Функция сравнения двух событий по ближайшей дате (строке) лексикографически
 * @param eventA событие
 * @param eventB событие
 * @returns результат сравнения двух события (-1, 0, 1)
 */
export function compareEventsNearestDates (eventA: Event, eventB: Event): number {
  if (eventA.nearestDate && eventB.nearestDate) {
    return eventA.nearestDate?.localeCompare(eventB.nearestDate)
  } else {
    return 0
  }
}