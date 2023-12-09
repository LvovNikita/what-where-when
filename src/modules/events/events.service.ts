import { FindManyOptions, Repository } from 'typeorm';
import { Event } from './classes/event.class'
import { EventList } from './classes/event-list.class';
import { EventEntity } from './entities/event.entity';

/**
 * Сервис для работы с событиями
 */
export class EventsService {
  constructor(private readonly eventRepository: Repository<EventEntity>) {}

  /**
   * Получить список событий по id подписчика
   * @param subscriberId id подписчика
   * @returns список событий
   */
  async findBySubscriberId(subscriberId: string): Promise<EventEntity[]> {
    return await this.eventRepository.find({ where: { subscriberId } })
  }

  /**
   * Объект, содержащий функции-конструкторы классов, логически связанных с сервисом 
   */
  public create = {
    /** Фабрика событий */
    event: (...params: ConstructorParameters<typeof Event>): Event => new Event(...params),
    /** Фабрика сущностей */
    eventEntity: (event: Event) => this.eventRepository.create(event),
    /** Фабрика списков событий */
    eventList: (events: Event[]): EventList => new EventList(events),
  }

  /**
   * 
   * @param options 
   * @returns 
   */
  async find(options: FindManyOptions<EventEntity> = {}): Promise<EventEntity[]> {
    return await this.eventRepository.find(options)
  }
}
