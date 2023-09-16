import { DataSource } from 'typeorm'

// Types:
import { Loggable } from '../core/loggable.class.mjs'
import pg from 'pg'
import { Logger } from '../logger/index.mjs'

/**
 * База данных
 */
export class Database extends Loggable {
  /**
   * @param { DataSource } dataSource источник данных 
   * @param { unknown } dbClient клиент/драйвер для работы с базой данный
   * @param { Logger } logger логгер
   */
  constructor(dataSource, dbClient, logger) {
    super(logger)
    this.dataSource = dataSource
    this.dbClient = dbClient
  }
  
  /**
   * Инициализировать источник данных
   */
  async initDataSource() {
    return this.dataSource
      .initialize()
      .then(async (dataSource) => {
        this.logger.info('.init(): Data source has been initialized')
      })
      .catch((err) => {
        this.logger.error(
          '.init(): Error during data source initialization: %s ',
          err.message
        )
      })
  }

  /**
   * Создать базу данных, если она ещё не существует
   */
  async createDatabase() {
    // Добавлять вручную логику для различных баз данных:
    if (this.dataSource.options.type === 'postgres') {
      /** @type {pg.Client} */
      const client = new this.dbClient({
        database: 'postgres',
        host: this.dataSource.options.host,
        port: this.dataSource.options.port,
        user: this.dataSource.options.username,
        password: this.dataSource.options.password
      })

      await client.connect()

      try {
        await client.query(`CREATE DATABASE "${this.dataSource.options.database}"`)
        await client.end()
      } catch (err) {
        if (err.message.includes('already exists')) {
          this.logger.info('.createDatabase(): PostgreSQL database already exists. Connected')
        } else {
          this.logger.warn(`createDatabase(): %s`, err.message)
        }
      }
    } else {
      this.logger.error('.createDatabase(): Data source type is not supported. Add logic manually');  
    }
  }
}
