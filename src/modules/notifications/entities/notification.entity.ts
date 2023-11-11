import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { NotificationType } from '../../../libs/enums/notification-type.enum';
import { Uuid } from 'libs/types/uuid.type';
import { PostgresDate } from 'libs/types/postgres-date.type';

@Entity({ name: 'notifications' })
export class NotificationEntity extends BaseEntity {
  /** Идентификатор UUID */
  @PrimaryColumn({ type: 'uuid' })
  public id: Uuid;

  /** Дата напоминания */
  @Column({ type: 'date' })
  public date: PostgresDate

  /** Тип уведомления (о какой сущности) */
  @Column({ type: 'enum', enum: NotificationType })
  public type: NotificationType

  /** Идентификатор сущности */
  @Column({ type: 'uuid', nullable: true })
  public sourceId?: Uuid | null
}
