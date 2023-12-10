import { ServiceLocator } from '../service-locator.service';

/**
 * Сервис с внедрённым локатором служб
 */
export type ServiceWithLocator = { services: ServiceLocator }
