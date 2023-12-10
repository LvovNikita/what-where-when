/**
 * Сервис валидации
 */
export class ValidationService {
  constructor(public validators: Map<string, RegExp>) {}

  /**
   * Проверка строки на соответствие регулярному выражения
   * @param str Сообщение
   * @param type Тип сообщения
   * @returns Результат проверки
   */
  verifyString(str: string, type: string): boolean {
    if (!this.validators.has(type)) return false
    const regex: RegExp = this.validators.get(type)!
    return regex.test(str);
  }
}
