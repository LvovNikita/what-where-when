import { randomUUID } from 'node:crypto'

export class Birthday {
  public id: string

  constructor(
    public subscriberId: string,
    public month: number,
    public date: number,
    public userHandler?: string
  ) {
    this.id = randomUUID();
  }
}
