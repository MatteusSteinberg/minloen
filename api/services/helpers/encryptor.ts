import Cryptr from "cryptr"

const key = process.env.SECRET

const cryptr = new Cryptr(key)

export function encrypt(v: string) {
  return cryptr.encrypt(v)
}

export function decrypt(v: string) {
  return cryptr.decrypt(v)
}