import ValidateCpf from '@/user/domain/entities/validate-cpf'
import { describe, expect, test } from 'vitest'

describe('Validate CPF', () => {
  test.each([
    '73761435053',
    '36068190056',
    '68492257075',
    '09034284077'
  ])('should be able to validate a cpf', async (cpf) => {
    const isValidCpf = new ValidateCpf(cpf)

    expect(isValidCpf).toBeTruthy()
  })

  test.each([
    '111.111.111-11', '222.222.222-22'
  ])('should be able to check if a cpf is invalid', async (cpf) => {

    expect(() => new ValidateCpf(cpf)).toThrow(new Error('Invalid document'))
  })
})