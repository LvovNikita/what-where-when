import { DataSource } from 'typeorm'
import * as migrations from '../../migrations'
import { EventEntity } from '../events/entities/event.entity'
import { EnvService } from '../env'
import { NotificationEntity } from './../notifications/entities/notification.entity'

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
  entities: [EventEntity, NotificationEntity],
  synchronize: false,
  migrations
})
