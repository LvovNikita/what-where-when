import { FindManyOptions, Repository } from 'typeorm';
import { BirthdayEntity } from './entities/birthday.entity';
import { Birthday } from './classes/birthday.class';
import { BirthdayList } from './classes/birthday-list.class';

/**
 * Сервис для работы с днями рождения
 */
export class BirthdaysService {
  constructor(private readonly birthdayRepository: Repository<BirthdayEntity>) {}

  /**
   * Поиск дней рождений по параметрам запроса
   * @param options Параметры поиска TypeORM
   * @returns Список сущностей дней рождений
   */
  async find(options: FindManyOptions<BirthdayEntity> = {}): Promise<BirthdayEntity[]> {
    return await this.birthdayRepository.find(options)
  }

  /**
   * Получить записи дней рождений по id подписчика
   * @param subscriberId id подписчика
   * @returns Записи дней рождений
   */
  async findBySubscriberId(subscriberId: string): Promise<BirthdayEntity[]> {
    return await this.birthdayRepository.find({ where: { subscriberId } })
  }

  /**
   * Объект, содержащий функции-конструкторы классов, логически связанных с сервисом 
   */
  public create = {
    /**
     * Фабрика дней рождений
     * @param params Параметры конструктора класса Birthday
     * @returns Объект дня рождения
     */
    birthday:  (...params: ConstructorParameters<typeof Birthday>): Birthday => new Birthday(...params),
    /**
     * Фабрика сущностей дней рождения
     * @param birthday Объект класса Birthday
     * @returns Сущность дня рождения
     */
    birthdayEntity: (birthday: Birthday): BirthdayEntity => this.birthdayRepository.create(birthday),
    /**
     * Фабрика списков дней рождений
     * @param birthdays Массив объектов класса Birthday
     * @returns Список дней рождения
     */
    birthdayList: (birthdays: Birthday[]): BirthdayList => new BirthdayList(birthdays),
  }
}
