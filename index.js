import pg from 'pg'

import { Database } from './src/modules/database/index.mjs'
import { dataSource } from './src/modules/database/data-source.mjs'
import { Logger } from './src/modules/logger/index.mjs'
// import { scheduler } from './src/modules/scheduler/index.mjs'

// Auto start:
import { config } from './src/modules/configuration/index.mjs'
import * as bot from  './src/modules/whatWhereWhenTgBot/index.mjs'

const database = new Database(dataSource, pg.Client, new Logger('database'))

init: (async () => {
  await database.createDatabase()
  await database.initDataSource()
  // await scheduler.start()
})()
