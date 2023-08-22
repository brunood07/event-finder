import ValidateEmail from '@/user/domain/entities/validate-email'
import { describe, expect, test } from 'vitest'

describe('Validate Email', () => {
  test.each([
    'brunood07@gmail.com',
    'test@test.com',
    'john@doe.com',
    'john@doe.com.br'
  ])('should be able to validate a email', async (email) => {
    const isValidEmail = new ValidateEmail(email)

    expect(isValidEmail).toBeTruthy()
  })

  test.each([
    'brunood07gmail.com',
    'test.com',
    'john2doe.com.br'
  ])('should be able to check if a email is invalid', async (email) => {

    expect(() => new ValidateEmail(email)).toThrow(new Error('Invalid email'))
  })
})