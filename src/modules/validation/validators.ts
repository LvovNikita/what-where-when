import { EventType } from '../../libs/enums/event-type.enum'

/**
 * 
 */
export const validators: Map<string, RegExp> = new Map([
  [EventType.BIRTHDAY, /^\d{2}.\d{2} @\S*$/],
  [EventType.ANNUAL, /^\d{2}.\d{2} .*$/],
  [EventType.MONTHLY, /^\d{2} .*$/],
  [EventType.WEEKLY, /^[1-7] .*$/],
  [EventType.ONE_TIME, /^\d{2}.\d{2}.\d{4} .*$/],
  [EventType.SPECIAL, /^[1-5]:[1-7]:\d{2} .*/]
]);
