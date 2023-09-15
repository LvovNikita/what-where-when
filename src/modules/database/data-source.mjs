import { config } from '../configuration/index.mjs'
import { DataSource } from 'typeorm'
import { EventEntity } from '../eventsService/entities/index.mjs'
import * as migrations from '../../../migrations/index.mjs'

// /**
//  * Конфигурация соединения с базой данных
//  */
export const dataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  database: `${config.POSTGRES_DBPREFIX}_${config.POSTGRES_DBNAME}`,
  username: config.POSTGRES_USERNAME,
  password: config.POSTGRES_PASSWORD,
  entities: [EventEntity],
  synchronize: false,
  migrations
})
