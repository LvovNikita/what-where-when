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

  /**
   * Информация о событии в виде строки
   * @returns информация о событии в соответствии с шаблоном
   */
  public get template(): string {
    const month = String(this.month).padStart(2, '0')
    const date = String(this.date).padStart(2, '0')
    return `${date}.${month} – ${this.userHandler}`
  }
}
