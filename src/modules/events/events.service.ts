import { DataSource, EntityTarget } from 'typeorm';
import { Event } from './classes/event.class'
import { EventList } from './classes/event-list.class';
import { EventEntity } from './entities/event.entity';

/**
 * Сервис для работы с событиями
 */
export class EventsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly EventEntity: EntityTarget<EventEntity>,
  ) {}

  /**
   * Получить список событий по id подписчика
   * @param subscriberId id подписчика
   * @returns список событий
   */
  async findBySubscriberId(subscriberId: string): Promise<EventEntity[]> {
    return await this.dataSource
      .getRepository(this.EventEntity)
      .find({ where: { subscriberId } })
  }

  /**
   * Объект, содержащий функции-конструкторы классов, логически связанных с сервисом 
   */
  public create = {
    /** Фабрика событий */
    event: (eventDto: EventEntity): Event => {
      return new Event(eventDto)
    },
    /** Фабрика списков событий */
    eventList(events: Event[]): EventList {
      return new EventList(events)
    }
  }
}
