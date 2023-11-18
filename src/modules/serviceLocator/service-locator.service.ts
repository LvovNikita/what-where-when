import { Client } from 'pg'

import { DatabaseService, postgresDataSource } from '../database'
import { EventsService } from '../events'
import { NotificationsService } from './../notifications'
import { EventEntity } from './../events/entities/event.entity'
import { NotificationEntity } from './../notifications/entities/notification.entity'
import { BirthdaysService } from './../birthdays'
import { BirthdayEntity } from './../birthdays/entities/birthday.entity'
import { DateTimeService } from './../../modules/datetime'
import { ValidationService } from './../../modules/validation'
import { validators } from '../validation/validators'
import { CronService } from '../cron'

/**
 * Cервисы под конкретный проект
 */
const customServices = {
  EventsService: new EventsService(postgresDataSource.getRepository(EventEntity)),
  BirthdaysService: new BirthdaysService(postgresDataSource.getRepository(BirthdayEntity))
}

/**
 * Локатор служб (сервисов)
 * В список включены типовые названия сервисов
 */
export const serviceLocator = {
  AdminService: null,
  AuthenticationService: null,
  AuthroizationService: null,
  CacheService: null,
  CronService: new CronService(),
  CryptographyService: null,
  DatabaseService: new DatabaseService(Client, postgresDataSource),
  DateTimeService: new DateTimeService(),
  GraphqlService: null,
  HttpService: null,
  MailerService: null,
  MenuService: null,
  NotificationsService: new NotificationsService(postgresDataSource, NotificationEntity),
  PagesService: null,
  QuestionnaireService: null,
  RabbitmqService: null,
  SecurityService: null,
  StaticService: null,
  SystemConfigService: null,
  TaxonomyService: null,
  UsersService: null,
  ValidationService: new ValidationService(validators),
  WebsocketService: null,
  ...customServices
}

/**
 * Типизация для подсказок в IDE
 */
export type ServiceLocator = typeof serviceLocator
