const TokenKey = 'Token'
const SignatureKey = 'Signature'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(val) {
  return localStorage.setItem(TokenKey, val)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
}

export function setSignature(val) {
  return localStorage.setItem(SignatureKey, val)
}

export function getSignature() {
  return localStorage.getItem(SignatureKey)
}

export function removeSignature() {
  localStorage.removeItem(SignatureKey)
}
