import { logger } from './../core/logger';
import { ScheduledTask, schedule, validate } from 'node-cron';

export class CronService {
  constructor(private jobsRegistry: Map<string, ScheduledTask> = new Map()) {}

  /**
   * Зарегистрировать задание
   * @param name имя задачи
   * @param cronExpression выражение cron в формате '* * * * * *'
   * @param callback вызываемая функция
   * @returns зарегистрированную задачу или null в случае ошибки
   */
  public registerJob(name: string, cronExpression: string, callback:() => void): ScheduledTask | null {
    const isValidExpression: boolean = validate(cronExpression)
    if (!isValidExpression) {
      logger.error('[CronService] cron expression is not valid')
      return null
    }
    if (this.jobsRegistry.has(name)) {
      logger.error('[CronService] job with this name was registered already')
      return null
    }
    const job: ScheduledTask = schedule(cronExpression, callback)
    this.jobsRegistry.set(name, job);
    return job
  }
}
