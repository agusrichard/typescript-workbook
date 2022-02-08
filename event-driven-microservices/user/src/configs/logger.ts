import fs, { WriteStream } from 'fs'
import path from 'path'

const createLogger = (dirname: string): WriteStream => {
  const logDirectory = path.join(dirname, '..', 'access.log')
  const accessLogStream = fs.createWriteStream(logDirectory, { flags: 'a' })
  return accessLogStream
}

export default createLogger
