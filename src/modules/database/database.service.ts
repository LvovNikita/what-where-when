import { DataSource } from 'typeorm'

import { logger } from '../core/logger'
import { Client, ClientConfig } from 'pg'

/**
 * Сервис, осуществляющий работу с базой данных
 */
export class DatabaseService {
  /** Экземпляр клиента базы данных */
  public client: any
  /** Параметры подключения к базе данных */
  public connectionOptions: unknown

  constructor(
    /** Класс драйвера базы данных */
    public Client: any,
    /** Datasource TypeORM */
    public dataSource: DataSource
  ) {
    if (this.dataSource.options.type === 'postgres') {
      this.connectionOptions = {
        database: 'postgres',
        host: this.dataSource.options.host,
        port: this.dataSource.options.port,
        user: this.dataSource.options.username,
        password: this.dataSource.options.password
      } as ClientConfig
    }
  }

  /**
   * Присоединиться к базе данных
   */
  public async connect(): Promise<void>  {
    if (this.dataSource.options.type === 'postgres') {
      try {
        this.client = await new this.Client(this.connectionOptions) as Client
        await this.client.connect()
        logger.info('[DatabaseService] connected to database')
      } catch (err) {
        logger.error(err)
      }
    } else {
      logger.error('[DatabaseService] datasource type is not supported')
    }
  }

  /**
   * Инициализировать источник данных
   */
  public async initDataSource(): Promise<void> {
    try {
      await this.dataSource.initialize()
      logger.info('[DatabaseService] datasource has been initialized')
    } catch (err) {
      logger.error(err)
    }
  };

  /**
   * Cоздать базу данных, если она ещё не существует
   */
  public async createDatabaseIfNotExists(): Promise<void>  {
    if (this.dataSource.options.type === 'postgres') {
      const client: Client = new this.Client(this.connectionOptions)
      const databaseName: string | undefined = this.dataSource.options.database
      try {
        await client.connect()
        await client.query(`CREATE DATABASE "${databaseName}"`)
        await client.end()
        logger.info(`[DatabaseService] database ${databaseName} has been created`)
      } catch (err: any) {
        if (err.message.includes('already exists')) {
          logger.info(`[DatabaseService] database ${databaseName} exists`)
        } else {
          logger.error(err)
        }
      }
    } else {
      logger.error('[DatabaseService] datasource type is not supported')
    }
  };
}
