import { Client } from 'pg'

import { DatabaseService, postgresDataSource } from '../database'
import { EventsService } from '../events'
import { NotificationsService } from '../notifications'
import { EventEntity } from './../events/entities/event.entity'
import { NotificationEntity } from './../notifications/entities/notification.entity'

/**
 * Cервисы под конкретный проект
 */
const customServices = {
  EventsService: new EventsService(postgresDataSource, EventEntity)
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
  CronService: null,
  DatabaseService: new DatabaseService(Client, postgresDataSource),
  HttpService: null,
  MailerService: null,
  MenuService: null,
  NotificationsService: new NotificationsService(postgresDataSource, NotificationEntity),
  PagesService: null,
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
