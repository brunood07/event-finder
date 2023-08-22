import { InvalidEmailError } from '@/user/infra/errors/invalid-email'

export default class ValidateEmail {
  readonly value: string

  constructor (email: string) {
    if (!this.isValid(email)) throw new InvalidEmailError()
    this.value = email
  }

  getValue () {
    return this.value
  }

  isValid (email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
}