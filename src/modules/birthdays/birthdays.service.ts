import { Repository } from 'typeorm';
import { BirthdayEntity } from './entities/birthday.entity';
import { Birthday } from './classes/birthday.class';

export class BirthdaysService {
  constructor(private readonly birthdayRepository: Repository<BirthdayEntity>) {}

  public create = {
    birthday:  (...params: ConstructorParameters<typeof Birthday>): Birthday => new Birthday(...params),
    birthdayEntity: (birthday: Birthday): BirthdayEntity => this.birthdayRepository.create(birthday),
  }
}
