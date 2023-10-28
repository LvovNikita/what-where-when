import { Client } from 'pg'

import { DatabaseService, postgresDataSource } from '../database'
import { EventsService } from '../events'
import { NotificationsService } from '../notifications'
import { EventEntity } from './../events/entities/event.entity'
import { NotificationEntity } from './../notifications/entities/notification.entity'
import { BirthdaysService } from './../birthdays'
import { BirthdayEntity } from './../birthdays/entities/birthday.entity'

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
export const serviceLocator: ServiceLocator = {
  AdminService: null,
  AuthenticationService: null,
  AuthroizationService: null,
  CacheService: null,
  CronService: null,
  DatabaseService: new DatabaseService(Client, postgresDataSource),
  DateTimeService: null,
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
  ValidationService: null,
  WebsocketService: null,
  ...customServices
}

/**
 * Типизация для подсказок в IDE
 */

export type ServiceLocator = Record<string, any> & {
  EventsService: EventsService,
  NotificationsService: NotificationsService,
  BirthdaysService: BirthdaysService,
}

export type ServiceWithLocator = { services: ServiceLocator }

/**
 * Функция для инжектирования локатора служб в сервисы
 * @param service сервис
 */
export function injectServiceLocator<T>(service: any): T & ServiceWithLocator {
  service.services = serviceLocator
  return service
}
