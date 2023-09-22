import { DataSource } from 'typeorm'
import { EventNotificationEntity } from './entities/index.mjs'
import { config } from '../configuration/index.mjs'

export class EventNotificationService {
  /**
   * @param { DataSource } dataSource
   * @param { EventNotificationEntity } EventNotificationEntity
   */
  constructor(dataSource, EventNotificationEntity) {
    this.dataSource = dataSource,
    this.EventNotificationEntity = EventNotificationEntity
  }

  async create(eventId, eventNearestDate) {
    const eventNotification = {
      event: {
        id: eventId
      },
      date: dayjs(eventNearestDate)
        .subtract(`${config.NOTIFY_IN} days`)
        .format('YYYY-MM-DD HH:mm:ss')
    }
    return await this
      .dataSource
      .getRepository(this.EventNotificationEntity)
      .save(eventNotification)

  }

  async getAll() {
    return await this
      .dataSource
      .getRepository(this.EventNotificationEntity)
      .find()
  }

  async removeById(id) {
    return await this
      .dataSource
      .getRepository(this.EventNotificationEntity)
      .delete(id)
  }
}