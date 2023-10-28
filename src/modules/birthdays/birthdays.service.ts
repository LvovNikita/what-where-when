import { Repository } from 'typeorm';
import { BirthdayEntity } from './entities/birthday.entity';
import { Birthday } from './classes/birthday.class';

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

  public create = {
    birthday:  (...params: ConstructorParameters<typeof Birthday>): Birthday => new Birthday(...params),
    birthdayEntity: (birthday: Birthday): BirthdayEntity => this.birthdayRepository.create(birthday),
  }
}
