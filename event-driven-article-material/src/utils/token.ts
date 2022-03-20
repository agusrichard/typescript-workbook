import jwt from 'jsonwebtoken'

import { createConfigs } from '../configs'

const conf = createConfigs()

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
