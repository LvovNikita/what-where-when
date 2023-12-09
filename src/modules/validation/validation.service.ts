/**
 * 
 */
export class ValidationService {
  constructor(public validators: Map<string, RegExp>) {}

  /**
   * 
   * @param str 
   * @param type 
   * @returns 
   */
  verifyString(str: string, type: string): boolean {
    if (!this.validators.has(type)) return false
    const regex: RegExp = this.validators.get(type)!
    return regex.test(str);
  }
}
