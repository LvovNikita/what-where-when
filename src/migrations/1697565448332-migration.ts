import { MigrationInterface, QueryRunner } from 'typeorm';
import { EnvService } from './../modules/env';
import { EventEntity } from './../modules/events/entities/event.entity';
import { EventType } from './../libs/enums/event-type.enum';

EnvService.initEnvVariables();

/**
 * Наполнение базы данных событиями 
 */
export class Migration1697565448332 implements MigrationInterface {
  name = 'Migration1697565448332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const subscriberId: string = process.env.TELEGRAM_INIT_EVENTS_CHAT_ID!;
    const type: EventType = EventType.SPECIAL;
    const day = 6;

    /** Общие свойства для всех событий */
    const commonProperties = {
      subscriberId,
      type,
      day
    }

    queryRunner.manager.getRepository(EventEntity).insert([
      { 
        id: '8dc55e7c-8c83-437e-b0af-7a657626ce75',
        subject: 'Очередная встреча в первую субботу апреля',
        week: 'first',
        month: 4,
        ...commonProperties
      },
      { 
        id: '81af5ddf-daa1-462f-823d-d798d9578b98',
        subject: 'День студенчества (последняя суббота января)',
        week: 'last',
        month: 1,
        ...commonProperties
      },
      { 
        id: 'd33297ef-d067-4396-9844-e750eda2faf1',
        subject: 'День молодёжи (последняя суббота июня)',
        week: 'last',
        month: 6,
        ...commonProperties
      },
      { 
        id: '2365acd5-0e69-4da3-bced-d64fd93b779c',
        subject: 'Очередная встреча в первую субботу августа',
        week: 'first',
        month: 8,
        ...commonProperties
      },
      { 
        id: '1c66b54f-3f48-48f1-b038-543c3c1d79fc',
        subject: 'День учителя (первая суббота октября)',
        week: 'first',
        month: 10,
        ...commonProperties
      },
      { 
        id: 'a4862a00-a811-4ed0-a48e-d62624783423',
        subject: 'Очередная встреча в первую субботу декабря',
        week: 'first',
        month: 12,
        ...commonProperties
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.getRepository(EventEntity).clear();
  }
}
