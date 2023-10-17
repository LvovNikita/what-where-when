import { logger } from '../../core/logger';

/**
 * Обработка ошибок, связанных с запросами
 * @param err ошибка
 */
export function handlePollingError (err: Error) {
  logger.error(`polling_error: ${err.message}`)
}
