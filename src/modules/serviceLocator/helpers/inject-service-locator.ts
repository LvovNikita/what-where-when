import { serviceLocator } from '../service-locator.service'
import { ServiceWithLocator } from '../types/service-with-locator.type'

/**
 * Функция для инжектирования локатора служб в сервисы
 * @param service сервис
 */
export function injectServiceLocator<T>(service: any): T & ServiceWithLocator {
  service.services = serviceLocator
  return service
}
