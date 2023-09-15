// TODO: переместить в EventsService!

import dayjs from 'dayjs'
import { EntitySchema } from 'typeorm'

// TODO: переместить

const EventsEnum = {
  SPECIAL_DAY: 'special',
  WEEKLY: 'weekly', 
  MONTHLY: 'monthly', 
  ANNUAL: 'annual',
  ONE_TIME: 'one_time'
}

/**
 * Сущность События
 */
export const EventEntity = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    subject: {
      type: 'varchar',
    },
    type: {
      type: 'enum',
      enum: EventsEnum,
    },
    week: {
      type: 'enum',
      enum: [1, 2, 3, 4, 5, 'first', 'last'],
      nullable: true,
    },
    dayOfTheWeek: {
      type: 'int',
      nullable: true,
    },
    month: {
      type: 'int',
      nullable: true
    },
    day: {
      type: 'int',
      nullable: true
    },
    year: {
      type: 'int',
      nullable: true
    },
    chatId: {
      type: 'varchar',
      nullable: false
    },
    repeatUntil: {
      type: 'date',
      default: dayjs().add(10, 'years').format('YYYY-MM-DD HH:mm:ss')
    }
  }
})
