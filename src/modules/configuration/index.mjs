import dotenv from 'dotenv'

export const config = {}

dotenv.config({
  /** Указываем, в каком объекте будут храниться переменные окружения */
  processEnv: config 
})