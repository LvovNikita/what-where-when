import { DataSource, EntityTarget } from 'typeorm';

import { NotificationEntity } from './entities/notification.entity';
import { NotificationType } from 'libs/enums/notification-type.enum';
import { randomUUID } from 'crypto';

export class NotificationsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly NotificationEntity: EntityTarget<NotificationEntity>,
  ) {}

  /**
   * Объект, содержащий функции-конструкторы классов, логически связанных с сервисом 
   */
  public create = {
    /**
     * Фабрика уведомлений
     * @param type тип уведомления (о какой сущности)
     * @param date дата уведомления в формате YYYY-MM-DD
     * @param sourceId идентификатор сущности
     */
    notification: (type: NotificationType, date: string, sourceId: string | null = null): NotificationEntity => {
      return this.dataSource
        .getRepository(this.NotificationEntity)
        .create({
          id: randomUUID(),
          type,
          date,
          sourceId
        })
    }
  }
}
