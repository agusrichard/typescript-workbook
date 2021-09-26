import jwt from 'jsonwebtoken'

import { Configs } from '../configs'

const generateToken = (payload: { id: number }) => {
  return jwt.sign(payload, Configs.SECRET_KEY, { expiresIn: '12h' })
}

const verifyToken = (token: string) => {
  return jwt.verify(token, Configs.SECRET_KEY)
}

export {
  verifyToken,
  generateToken,
}
