import pg from 'pg'

// import { expressApp } from './src/modules/expressApp/index.mjs'
import { config } from './src/modules/configuration/index.mjs'
import { whatWhereWhenTgBot } from  './src/modules/whatWhereWhenTgBot/index.mjs'
import { dataSource } from './src/modules/database/data-source.mjs'
// import { scheduler } from './src/modules/scheduler/index.mjs'

import { Database } from './src/modules/database/index.mjs'
// import { HttpServer } from './src/modules/httpServer/index.mjs'
import { Logger } from './src/modules/logger/index.mjs'

// const httpServerLogger = new Logger('httpServer')
const databaseLogger = new Logger('database')

// const httpServer = new HttpServer(expressApp, httpServerLogger)
const database = new Database(dataSource, pg.Client, databaseLogger)

init: (async () => {
  await database.createDatabase()
  await database.initDataSource()
  // await scheduler.start()
})()

// httpServer.listen(config.HTTP_SERVER_PORT)