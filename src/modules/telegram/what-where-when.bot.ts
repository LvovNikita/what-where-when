import TelegramBot from 'node-telegram-bot-api'
import { menuCommands } from './data/menu-commands';
import { addBirthdayHandler, addEventHandler, getBirthdaysHandler, getEventsHandler, getNearestEventHandler, handleCallbackQuery, handlePollingError } from './handlers';
import { EnvService } from './../env'

EnvService.initEnvVariables()

/**
 * Telegram-бот What-Where-When
 */
export const whatWhereWhenTgBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: true })

// Меню с командами бота
whatWhereWhenTgBot.setMyCommands(menuCommands);

whatWhereWhenTgBot.onText(/\/add_event/, addEventHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/events/, getEventsHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/when/, getNearestEventHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/add_bday/, addBirthdayHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/bdays/, getBirthdaysHandler.bind(whatWhereWhenTgBot));

whatWhereWhenTgBot.on('callback_query', handleCallbackQuery)
whatWhereWhenTgBot.on('polling_error', handlePollingError)
