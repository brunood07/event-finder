import ValidateDate from '@/event/domain/entities/validate-date'
import { describe, expect, it } from 'vitest'

describe('Validate Date', () => {
  it('should be able to validate if the date is higher or same than the current date', async () => {
    const todayDate = new Date()
    expect(new ValidateDate(todayDate)).toBeTruthy()
  })

  it.each([
    '2023-08-19T13:00:00.143Z', 
    '2023-08-18T13:00:00.143Z', 
    '2023-08-17T13:00:00.143Z', 
    '2023-08-16T13:00:00.143Z'
  ])('should be able to validate if the date is lower than the current date', async (date: string) => {
    const sendDate = new Date(date)

    expect(() => new ValidateDate(sendDate)).toThrow('Invalid date')
  })
})