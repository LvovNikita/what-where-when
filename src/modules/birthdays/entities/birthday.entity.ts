import { PostgresDate } from 'libs/types/postgres-date.type';
import { TelegramUserHandler } from 'libs/types/telegram-user-handler.type';
import { Uuid } from 'libs/types/uuid.type';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Сущность дня
 */
@Entity({ name: 'birthdays' })
export class BirthdayEntity extends BaseEntity {
  /** Идентификатор UUID */
  @PrimaryColumn({ type: 'uuid', generated: false })
  public id: Uuid;

  /** Идентификатор подписчика на событие (например чат, пользователь) */
  @Column('varchar')
  public subscriberId: string

  /** Месяц события */
  @Column({ type: 'int' })
  public month: number

  /** Дата события */
  @Column({ type: 'int' })
  public date: number

  /** Никнейм пользователя-именинника */
  @Column({ type: 'varchar', nullable: true })
  public userHandler?: TelegramUserHandler

  /** Уведомлять о событии до */
  @Column({ type: 'date', default: '2033-09-25' })
  protected until?: PostgresDate
}
