import fetch from 'dva/fetch'
import { getToken, getSignature } from './storage'

const BASE_URL = '/api'

function stringifyParams(data) {
  return Object.prototype.toString.call(data) === '[object Object]' && Object.keys(data).length > 0
    ? Object.keys(data)
        .map(k => k + '=' + data[k])
        .join('&')
    : ''
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function http(url, options) {
  return fetch(BASE_URL + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({
      ...data
    }))
    .catch(err => err)
}

export default function request({ url, params, method = 'POST', headers = {} }) {
  if (getToken()) {
    headers['accessToken'] = getToken()
  }
  if (getSignature()) {
    headers['signature'] = getSignature()
  }
  if (method.toLowerCase() === 'get') {
    if (params) {
      url += `?${stringifyParams(params)}`
    }
    return http(url, {
      method: 'GET'
    })
  } else {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      return http(url, {
        method: 'POST',
        headers,
        body: stringifyParams(params)
      })
    } else {
      headers['Accept'] = 'application/json, text/plain, */*'
      headers['Content-Type'] = 'application/json; charset=UTF-8'
      return http(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(params)
      })
    }
  }
}
