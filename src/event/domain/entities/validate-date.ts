import { InvalidDateError } from '@/event/infra/errors/invalid-date'

export default class ValidateDate {
    
  constructor(date: Date) {
    if(this.isDateValid(date)) throw new InvalidDateError()
  }

  isDateValid(date: Date): boolean {
    const actualDate = new Date()
    return date < actualDate
  }
}