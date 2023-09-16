import { Agenda } from 'agenda'
import { config } from '../configuration/index.mjs'

/**
 * Планировщик заданий
 */
export const scheduler = new Agenda({
  db: {
    address: config.MONGODB_CONNECTION_STRING
  }
})

