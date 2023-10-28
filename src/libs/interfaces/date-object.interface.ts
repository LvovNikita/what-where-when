import { Week } from 'modules/events/types/week.type';

export interface IDateObject {
  year: null | number, 
  month: null | number, 
  date: null | number, 
  day: null | number, 
  week: null | Week 
}
