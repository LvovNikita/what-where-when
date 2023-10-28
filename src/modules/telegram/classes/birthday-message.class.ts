/**
 * Сообщение с информацией о создаваемом событии дня рождения
 */
export class BirthdayMessage {
  constructor (public message: string) {}

  get userHandler(): string {
    const userHandlerStart: number = this.message.indexOf(' ') + 1
    return this.message.substring(userHandlerStart)
  }

  get date(): { date: string, month: string} {
    const dateEnd: number = this.message.indexOf(' ')
    const dateArr: string[] = this.message.substring(0, dateEnd).split(/\.|:/)
    return {
      date: dateArr[0],
      month: dateArr[1],
    }
  }
}
