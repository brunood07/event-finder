import PasswordHash from '@/user/domain/entities/password-hash'
import { describe, expect, it } from 'vitest'

describe('Password Hash', () => {
  it('should be able to create a password hash', async () => {
    const password_hash = await PasswordHash.create('abc123', 'salt')
    expect(password_hash.value).toBe('bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2')
    expect(password_hash.salt).toBe('salt')
  })

  it('should be able to validate a password hash', async () => {
    const password = new PasswordHash('bd2615764cdf90d3f7467d0de0ca5e5cc87eaedf03471a462c354767e8ded32658a99116d16a2d45dca94a723d3535019125459b9dbaeb53960d8c11283289c2', 'salt')
    const isValid = await password.validate('abc123')
    expect(isValid).toBeTruthy() 
  })
})