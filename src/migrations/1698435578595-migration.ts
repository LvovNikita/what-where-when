import { MigrationInterface, QueryRunner } from 'typeorm';
import dayjs from 'dayjs';
import { DateFormat } from './../libs/enums/date-format.enum';
import { NotificationType } from './../libs/enums/notification-type.enum';
import { BirthdayEntity } from './../modules/birthdays/entities/birthday.entity';
import { NotificationEntity } from './../modules/notifications/entities/notification.entity';

/**
 * Наполнение базы данных уведомлениями
 */
export class Migration1698435578595 implements MigrationInterface {
  name = 'Migration1698435578595'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const commonProperties = {
      date: dayjs().format(DateFormat.POSTGRES),
      type: NotificationType.EVENT
    }

    queryRunner.manager.getRepository(NotificationEntity).insert([
      {
        id: 'eede84ed-c376-4a8c-ad5f-f1212efd5632',
        sourceId: '8dc55e7c-8c83-437e-b0af-7a657626ce75', // Очередная встреча в первую субботу апреля
        ...commonProperties
      },
      {
        id: '6751bc00-43aa-4b25-922b-d52c8c9c057d',
        sourceId: '81af5ddf-daa1-462f-823d-d798d9578b98', // День студенчества (последняя суббота января)
        ...commonProperties
      },
      {
        id: 'add34740-95ea-475f-a9f2-cf317a3295c1',
        sourceId: 'd33297ef-d067-4396-9844-e750eda2faf1', // День молодёжи (последняя суббота июня)
        ...commonProperties
      },
      {
        id: '6ee0f7ec-d92c-40aa-b16c-b0f2c2f24dbd',
        sourceId: '2365acd5-0e69-4da3-bced-d64fd93b779c', // Очередная встреча в первую субботу августа
        ...commonProperties
      },
      {
        id: 'aca229de-7b20-414f-a81b-30ab6df864c8',
        sourceId: '1c66b54f-3f48-48f1-b038-543c3c1d79fc', // День учителя (первая суббота октября)
        ...commonProperties
      },
      {
        id: '85090038-4352-4c1d-97df-33d040e56ae9',
        sourceId: 'a4862a00-a811-4ed0-a48e-d62624783423', // Очередная встреча в первую субботу декабря
        ...commonProperties
      }
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager.getRepository(BirthdayEntity).clear();
  }
}
