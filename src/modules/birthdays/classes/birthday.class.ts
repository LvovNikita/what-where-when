import { PostgresDate } from 'libs/types/postgres-date.type';
import { Uuid } from 'libs/types/uuid.type';
import { randomUUID } from 'node:crypto'

export class Birthday {
  public id: Uuid

  constructor(
    public subscriberId: string,
    public month: number,
    public date: number,
    public userHandler?: string
  ) {
    this.id = randomUUID();
  }

  public get nearestDate(): PostgresDate | null {
    return null
    // TODO:
  }

  /**
   * Информация о событии в виде строки
   * @returns информация о событии в соответствии с шаблоном
   */
  public get template(): string {
    // TODO: временно
    return `${this.month}-${this.date} – ${this.userHandler}`
    // return `${this.nearestDate} – ${this.userHandler}`
  }
}
