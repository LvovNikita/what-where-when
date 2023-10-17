/**
 * Тип события по периодичности
 */
export enum EventType {
  /** Настраиваемое  */
  SPECIAL = 'special',
  /** Еженедельное */
  WEEKLY = 'weekly',
  /** Ежемесячное */
  MONTHLY = 'monthly',
  /** Ежегодное */
  ANNUAL = 'annual',
  /** Разовое  */
  ONE_TIME = 'one_time'
}
