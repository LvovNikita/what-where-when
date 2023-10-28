import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { EventType } from '../../../libs/enums/event-type.enum'
import { Week } from '../types/week.type'

/**
 * Сущность события
 */
@Entity({ name: 'events' })
export class EventEntity extends BaseEntity {
  /** Идентификатор UUID */
  @PrimaryColumn({ type: 'uuid' })
  public id: string

  /** Название события */
  @Column('varchar')
  public subject: string

  /** Тип события (регулярность) */
  @Column({ type: 'enum', enum: EventType })
  public type: EventType
  
  /** Идентификатор подписчика на событие (например чат, пользователь) */
  @Column('varchar')
  public subscriberId: string
  
  /** Год события */
  @Column({ nullable: true, type: 'int' })
  public year?: number

  /** Месяц события */
  @Column({ nullable: true, type: 'int' })
  public month?: number

  /** Дата события */
  @Column({ nullable: true, type: 'int' })
  public date?: number

  /** Номер недели месяца */
  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5, 'first', 'last'], nullable: true })
  public week?: Week

  /** День недели */
  @Column({ nullable: true, type: 'int' })
  public day?: number

  /** Уведомлять о событии до */
  @Column({ type: 'date', default: '2033-09-25' })
  protected until?: string
}
