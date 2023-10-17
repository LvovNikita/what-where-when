import { EventType } from './../../../libs/enums/event-type.enum';

/**
 * Клавиатура для выбора типа события
 */
export const chooseEventTypeKeyboard = [
  [
    {
      "text": "Настраиваемое",
      "callback_data": `/${EventType.SPECIAL}`
    }
  ],
  [
    {
      "text": "Ежегодное",
      "callback_data": `/${EventType.ANNUAL}`
    },
    {
      "text": "Ежемесячное",
      "callback_data": `/${EventType.MONTHLY}`
    },
    {
      "text": "Еженедельное",
      "callback_data": `/${EventType.WEEKLY}`
    }
  ],
  [
    {
      "text": "Разовое",
      "callback_data": `/${EventType.ONE_TIME}`
    }
  ]
]
