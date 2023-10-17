import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { NotificationType } from '../../../libs/enums/notification-type.enum';
import { randomUUID } from 'crypto';

@Entity({ name: 'notifications' })
export class NotificationEntity extends BaseEntity {
  /** Идентификатор UUID */
  @PrimaryColumn({ type: 'uuid' })
  public id: string = randomUUID();

  /** Дата напоминания */
  @Column({ type: 'date' })
  public date: string

  /** Тип уведомления (о какой сущности) */
  @Column({ type: 'enum', enum: NotificationType })
  public type: NotificationType

  /** Идентификатор сущности */
  @Column({ type: 'uuid', nullable: true })
  public sourceId?: string | null
}
