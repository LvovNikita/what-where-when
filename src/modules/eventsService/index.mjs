import dayjs from 'dayjs';

// TODO: ПОФИКСИТЬ ЛОКАЛЬ. НАЧАЛО НЕДЕЛИ ДОЛЖНО БЫТЬ В ПОНЕДЕЛЬНИК

export class EventsService {
  constructor(dataSource, EventEntity) {
    this.dataSource = dataSource,
    this.EventEntity = EventEntity
  }

  async save(event) {
    await this
      .dataSource
      .getRepository(this.EventEntity)
      .save(event)
  }

  async getAll(chatId) {
    return await this
      .dataSource
      .getRepository(this.EventEntity)
      .find({
        where: {
          chatId
        }
      })
  }

  constructEvent(createEventDto) {
    return new Event(createEventDto);
  }

  constructEventList(...events) {
    return new EventList(...events);
  }
}

class Event {
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

  get template() {
    return `${this.nearestDate} – ${this.subject}`
  }

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

class EventList {
  constructor(events) {
    this.events = events.sort((a, b) => a.nearestDate.localeCompare(b.nearestDate));
  }

  get template() {
    return this.events.reduce((acc, curr) => acc + curr.template + '\n' , '')
  }

  get closestEvent() {
    return this.events[0]
  }
}
