import dayjs from 'dayjs';

// TODO: Пофиксить локаль: начало недели в понедельник

/**
 * Событие
 */
export class Event {
  /**
   * @param { Event } createEventDto 
   */
  constructor(createEventDto) {
    // TODO: data check!
    this.subject = createEventDto.subject
    this.type = createEventDto.type
    this.chatId = createEventDto.chatId
    this.year = createEventDto.year ?? null
    this.month = createEventDto.month ?? null
    this.day = createEventDto.day ?? null
    this.week = createEventDto.week ?? null
    this.dayOfTheWeek = createEventDto.dayOfTheWeek ?? null
  }

  /**
   * Информация о событии в виде строки
   * @returns { string } информация о событии
   */
  get template() {
    return `${this.nearestDate} – ${this.subject}`
  }

  /**
   * Ближайшая дата события
   * @returns { string } дата в формате YYYY-MM-DD 
   */
  get nearestDate() {
    const currentDate = Date.now()
    let nearestDate = null;
    if (this.type === 'annual') {
      nearestDate = dayjs()
        .month(this.month - 1)
        .date(this.day)
      if (nearestDate.isBefore(currentDate)) {
        nearestDate = nearestDate.add(1, 'year')
      }
    } else if (this.type === 'monthly') {
      nearestDate = dayjs()
        .date(this.day)
      if (nearestDate.isBefore(currentDate)) {
        nearestDate = nearestDate
          .add(1, 'month')
          .date(this.day)
      }
    } else if (this.type === 'weekly') {
      nearestDate = dayjs()
        .startOf('week')
        .day(this.dayOfTheWeek)
        if (nearestDate.isBefore(currentDate)) {
          nearestDate = nearestDate.add(1, 'week')
        }
    } else if (this.type === 'one_time') {
      nearestDate = dayjs()
        .year(this.year)
        .month(this.month)
        .date(this.day)
      if (nearestDate.isBefore(currentDate)) {
        nearestDate = null
      }
    } else if (this.type === 'special') {
      nearestDate = dayjs()
        .month(this.month - 1)
        .startOf('month')
      if (Number.isInteger(this.week)) {
        nearestDate = nearestDate.add(this.week - 1, 'weeks')
      } else if (this.week === 'first') {
        // не делать ничего, мы уже в начале месяца
      } 
      else if (this.week === 'last') {
        nearestDate = nearestDate
          .endOf('month')
          .subtract(6, 'days') // чтобы не попасть на тот же день недели
      }
      nearestDate = nearestDate.day(this.dayOfTheWeek)
      if (nearestDate.isBefore(currentDate)) {
        nearestDate = nearestDate.add(1, 'year')
      }
    }
    return nearestDate?.format('YYYY-MM-DD') || ''
  }
}