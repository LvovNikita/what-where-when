import { FindManyOptions, Repository } from 'typeorm';
import { BirthdayEntity } from './entities/birthday.entity';
import { Birthday } from './classes/birthday.class';
import { BirthdayList } from './classes/birthday-list.class';

export class BirthdaysService {
  constructor(private readonly birthdayRepository: Repository<BirthdayEntity>) {}

  /**
   * Получить список событий по id подписчика
   * @param subscriberId id подписчика
   * @returns список событий
   */
  async findBySubscriberId(subscriberId: string): Promise<BirthdayEntity[]> {
    return await this.birthdayRepository.find({ where: { subscriberId } })
  }

  /**
   * 
   */
  public create = {
    /**
     * 
     * @param params 
     * @returns 
     */
    birthday:  (...params: ConstructorParameters<typeof Birthday>): Birthday => new Birthday(...params),
    /**
     * 
     * @param birthday 
     * @returns 
     */
    birthdayEntity: (birthday: Birthday): BirthdayEntity => this.birthdayRepository.create(birthday),
    /**
     * 
     * @param birthdays 
     * @returns 
     */
    birthdayList: (birthdays: Birthday[]): BirthdayList => new BirthdayList(birthdays),
  }

  /**
   * 
   * @param options 
   * @returns 
   */
  async find(options: FindManyOptions<BirthdayEntity> = {}): Promise<BirthdayEntity[]> {
    return await this.birthdayRepository.find(options)
  }
}
