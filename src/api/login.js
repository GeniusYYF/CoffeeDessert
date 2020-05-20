import request from '@/utils/request.js'

export function postLogin (orgnCode, account, password, captchaId, captchaCode) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      orgnCode: orgnCode,
      account: account,
      password: password,
      captchaId: captchaId,
      captchaCode: captchaCode
    }
  })
}