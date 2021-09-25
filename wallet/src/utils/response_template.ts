import { Response } from 'express'

const successResponse = (res: Response, message: string, data?: any) => {
  return res.status(200).json({
    data,
    message,
    success: true,
  })
}

const internalServerError = (res: Response) => {
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
}

const badRequestError = (res: Response, message: string) => {
  return res.status(400).json({
    message,
    success: false,
  })
}

const unauthorizedError = (res: Response) => {
  return res.status(401).json({
    success: false,
    message: 'Unauthorized'
  })
}

export default {
  successResponse,
  badRequestError,
  unauthorizedError,
  internalServerError,
}