import { pbkdf2, randomBytes } from 'node:crypto'
 
export default class PasswordHash {
  static ITERATIONS = 100
  static KEY_LENGTH = 64
  static DIGEST = 'sha512'

  constructor (readonly value: string, readonly salt: string ) { }

  static create(password: string, salt?: string): Promise<PasswordHash> {
    const generatedSalt = salt || randomBytes(20).toString('hex')
    return new Promise((resolve) => {
      pbkdf2(password, generatedSalt, PasswordHash.ITERATIONS, PasswordHash.KEY_LENGTH, PasswordHash.DIGEST, (error, value) => {
        resolve(new PasswordHash(value.toString('hex'), generatedSalt))
      })
    })
  }

  async validate(password: string) {
    return new Promise((resolve) => {
      pbkdf2(password, this.salt, PasswordHash.ITERATIONS, PasswordHash.KEY_LENGTH, PasswordHash.DIGEST, (error, value) => {
        resolve(this.value === value.toString('hex'))
      })
    })
  }
}