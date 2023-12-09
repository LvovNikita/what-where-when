import isoWeek from 'dayjs/plugin/isoWeek'
import dayjs, { Dayjs } from 'dayjs';
import { Week } from 'modules/events/types/week.type';

dayjs.extend(isoWeek)

export class DateTimeService {
  
  /**
   * Получить номер недели месяца, на которую приходится дата
   * @param d Дата в формате Dayjs
   * @returns Номер недели месяца, на которую приходится дата
   */
  static weekOfMonth(d: Dayjs): number {
    const date: number = d.date()
    const day: number = d.isoWeekday()
    return Math.ceil((date - 1 - day) / 7) + 1
  }

  /**
   * Получить количество недель в месяце по номеру месяца
   * @param month Номер месяца 
   * @returns Количество недель в месяце
   */
  static weeksInMonth(month: number): number {
    const daysInMonth: number = dayjs().month(month).endOf('month').date()
    const monthStartDay: number = dayjs().month(month).startOf('month').isoWeekday()
    return Math.ceil((monthStartDay + daysInMonth) / 7)
  }

  /**
   * Генератор дат ежегодных событий
   * @param month месяц
   * @param date число
   * @returns дату ближайшего ежегодного события
   */
  * annualEventGenerator(startMonth: number, startDate: number): IterableIterator<Dayjs> {
    let currentDate: Dayjs = dayjs()
      .month(startMonth - 1)
      .date(startDate)
    const getNextDate = (currentDate: Dayjs): Dayjs => currentDate.add(1, 'year');
    if (currentDate.isBefore(Date.now())) {
      currentDate = getNextDate(currentDate)
    }
    while (true) {
      yield currentDate
      currentDate = getNextDate(currentDate)
    }
  }

  /**
   * Генератор дат ежемесячных событий
   * @param date число
   * @returns дату ближайшего ежемесячного события
   */
  * monthlyEventGenerator(date: number): IterableIterator<Dayjs> {
    let currentDate: Dayjs = dayjs()
      .date(date)
    const getNextDate = (currentDate: Dayjs): Dayjs => currentDate.add(1, 'month').date(date)
    if (currentDate.isBefore(Date.now())) {
      currentDate = getNextDate(currentDate)
    }
    while (true) {
      yield currentDate
      currentDate = getNextDate(currentDate)
    }
  }
  
  /**
   * Генератор дат еженедельных событий
   * @param day день недели
   * @returns дату ближайшего еженедельного события
   */
  * weeklyEventGenerator(day: number): IterableIterator<Dayjs> {
    let currentDate: Dayjs = dayjs()
      .startOf('week')
      .isoWeekday(day)
    const getNextDate = (currentDate: Dayjs): Dayjs => currentDate.add(1, 'week')
    if (currentDate.isBefore(Date.now())) {
      currentDate = getNextDate(currentDate)
    }
    while (true) {
      yield currentDate
      currentDate = getNextDate(currentDate)
    }
  }

  /**
   * Генератор дат(ы) разовых событий
   * @param year год
   * @param month месяц
   * @param date число
   * @returns дату ближайшего разового события
   */
  * oneTimeEventGenerator(year: number, month: number, date: number): IterableIterator<Dayjs> {
    const currentDate: Dayjs = dayjs()
      .year(year)
      .month(month)
      .date(date)
    yield currentDate
    if (currentDate.isBefore(Date.now())) {
      return null
    }
  }

  /**
   * Генератор дат настраиваемых событий
   * @param month месяц
   * @param week неделя месяца
   * @param day день недели
   * @returns дату ближайшего настраиваемого события
   */
  * specialEventGenerator(month: number, week: Week, day: number): IterableIterator<Dayjs> {
    let currentDate: Dayjs = dayjs().subtract(1, 'year')

    function getNextDate(currentDate: Dayjs): Dayjs {
      currentDate = currentDate
        .add(1, 'year')
        .month(month - 1)
        .startOf('month')
      const isFirstWeek = [1, 'first'].includes(week)
      const isLastWeek = [5, 'last'].includes(week)
      if (isFirstWeek) {
        if (day < currentDate.isoWeekday()) {
          currentDate = currentDate.add(7, 'days').isoWeekday(1)
        }
      }
      else if (isLastWeek) {
        currentDate = currentDate.endOf('month').startOf('week')
        if (day > currentDate.isoWeekday()) {
          currentDate = currentDate.subtract(1, 'week').isoWeekday(1)
        }
      } else if (typeof week === 'number') {
        currentDate = currentDate.add(week - 1, 'weeks').isoWeekday(1)
      }
      currentDate = currentDate.isoWeekday(day)
      return currentDate
    }

    currentDate = getNextDate(currentDate)

    if (currentDate.isBefore(Date.now())) {
      currentDate = getNextDate(currentDate)
    }

    while (true) {
      yield currentDate
      currentDate = getNextDate(currentDate)
    }
  }
} 
