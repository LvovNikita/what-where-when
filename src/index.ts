import { whatWhereWhenTgBot } from './modules/telegram'
import { serviceLocator } from './modules/serviceLocator'

const { DatabaseService } = serviceLocator

const init = async () => {
  await DatabaseService.createDatabaseIfNotExists()
  await DatabaseService.initDataSource()
  await DatabaseService.connect()
  whatWhereWhenTgBot
}

init()
