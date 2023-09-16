// Types:
import { DataSource } from 'typeorm';
import { EventEntity } from './entities/index.mjs'
import { Event } from './classes/event.class.mjs';
import { EventList } from './classes/event-list.class.mjs';

/**
 * Сервис для работы с событиями (CRUD)
 */
export class EventsService {
  /** 
   * @param { DataSource } dataSource 
   * @param { EventEntity } EventEntity 
   */
  constructor(dataSource, EventEntity) {
    this.dataSource = dataSource,
    this.EventEntity = EventEntity
  }

  /**
   * Сохранить событие в базе данных
   * @param { Event } event 
   */
  async save(event) {
    await this
      .dataSource
      .getRepository(this.EventEntity)
      .save(event)
  }

  /**
   * Получить список событий из базы данных
   * @param { string } chatId id чата, события которого необходимо выбрать
   * @returns { Promise<Event> } 
   */
  async getAll(chatId) {
    return await this
      .dataSource
      .getRepository(this.EventEntity)
      .find({
        where: {
          chatId
        }
      })
  }

  /**
   * Фабрика событий
   * @param { unknown } createEventDto 
   * @returns { Event } событие
   */
  constructEvent(createEventDto) {
    return new Event(createEventDto);
  }

  /**
   * Строитель списка событий
   * @param { Event[] } events массив экземпляров событий
   * @returns { EventList }
   */
  constructEventList(...events) {
    return new EventList(...events);
  }
}
