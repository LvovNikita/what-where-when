import { EntitySchema } from 'typeorm';

export const EventNotificationEntity = new EntitySchema({
  name: 'EventNotification',
  tableName: 'event-notification',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    date: {
      type: 'date',
      nullable: false
    },
  },
  relations: {
    event: {
      target: 'Event',
      type: 'one-to-one',
      joinColumn: true
    }
  }
})