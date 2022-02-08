import jwt from 'jsonwebtoken'

import configs from '../configs'

const conf = configs.createConfigs()

const generateToken = (payload: { id: string }) => {
  return jwt.sign(payload, conf.SECRET_KEY, { expiresIn: '12h' })
}

const verifyToken = (token: string) => {
  return jwt.verify(token, conf.SECRET_KEY)
}

export {
  verifyToken,
  generateToken,
}
