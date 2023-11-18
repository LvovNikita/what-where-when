import { whatWhereWhenTgBot } from './modules/telegram'
import { serviceLocator } from './modules/serviceLocator'
import { notifyAboutBirthdays } from './modules/cron/jobs/notify-about-birthdays'
import { notifyAboutEvents } from './modules/cron/jobs/notify-about-events'

const { DatabaseService, CronService } = serviceLocator

const init = async (): Promise<void> => {
  await DatabaseService.createDatabaseIfNotExists()
  await DatabaseService.initDataSource()
  await DatabaseService.connect()
  CronService.registerJob('notifyAboutBirthdaysAt10:00', '0 10 * * *' , notifyAboutBirthdays)
  CronService.registerJob('notifyAboutEventsAt10:00', '0 10 * * *', notifyAboutEvents)
  whatWhereWhenTgBot
}

init()
