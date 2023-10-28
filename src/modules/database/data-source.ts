import { DataSource } from 'typeorm'
import { EnvService } from '../env'
import * as migrations from '../../migrations'
import { EventEntity } from '../events/entities/event.entity'
import { NotificationEntity } from './../notifications/entities/notification.entity'
import { BirthdayEntity } from './../../modules/birthdays/entities/birthday.entity'

EnvService.initEnvVariables()

/**
 * Конфигурация соединения с базой данных
 */
export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  database: `${process.env.POSTGRES_DBPREFIX}_${process.env.POSTGRES_DBNAME}`,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  entities: [EventEntity, BirthdayEntity, NotificationEntity],
  synchronize: false,
  migrations
})
