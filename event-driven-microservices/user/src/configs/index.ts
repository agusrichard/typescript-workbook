import createLogger from './logger'
import createMongoDB from './database'
import createConfigs, { ConfigType } from './configs'

const configs = {
  createLogger,
  createMongoDB,
  createConfigs,
}

export {
  ConfigType,
}

export default configs
