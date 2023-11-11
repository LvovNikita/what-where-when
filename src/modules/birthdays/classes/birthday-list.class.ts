import { Birthday } from './birthday.class';

/**
 * Список дней рождения
 */
export class BirthdayList {
  public birthdays: Birthday[];
  private noBirthdaysRecords = 'Нет информации о днях рождения'

  constructor(birthdays: Birthday[]) {  
    this.birthdays = birthdays.sort()
  }

  /**
   * Получить информацию о днях рождения в виде списка (текстового)
   * @returns информацию о днях рождения в виде списка
   */
  get template() {
    return this.birthdays.reduce((acc, curr) => acc + curr.template + '\n' , '') || this.noBirthdaysRecords
  }
}
