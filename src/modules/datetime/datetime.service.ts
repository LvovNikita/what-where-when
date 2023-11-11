import dayjs from 'dayjs';

export class DateTimeService {
  /**
   * Генератор дат ежегодных событий
   * @param month 
   * @param date 
   */
  * annualEventGenerator(month: number, date: number): IterableIterator<dayjs.Dayjs> {

  }

  /**
   * Генератор дат ежемесячных событий
   * @param date 
   */
  * monthlyEventGenerator(date: number): IterableIterator<dayjs.Dayjs> {

  }
  
  /**
   * Генератор дат еженедельных событий
   * @param day 
   */
  * weeklyEventGenerator(day: number): IterableIterator<dayjs.Dayjs> {

  }

  /**
   * Генератор дат(ы) разовых событий
   * @param year 
   * @param month 
   * @param date 
   */
  * oneTimeEventGenerator(year: number, month: number, date: number): IterableIterator<dayjs.Dayjs> {

  }

  /**
   * Генератор дат настраиваемых событий
   * @param month 
   * @param week 
   * @param day 
   */
  * specialEventGenerator(month: number, week: number, day: number): IterableIterator<dayjs.Dayjs> {

  }
} 
