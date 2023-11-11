import TelegramBot from 'node-telegram-bot-api';
import { menuCommands } from './data/menu-commands';
import {
  createBirthdayHandler,
  addEventHandler,
  getBirthdaysHandler,
  getEventsHandler,
  getNearestEventHandler,
  handleCallbackQuery,
  handlePollingError,
} from './handlers';
import { EnvService } from './../env';
import { ServiceWithLocator } from './../../modules/serviceLocator/types/service-with-locator.type';
import { injectServiceLocator } from './../../modules/serviceLocator/helpers/inject-service-locator';

EnvService.initEnvVariables();

/**
 * Telegram-бот What-Where-When
 */
const bot: TelegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: true });
export const whatWhereWhenTgBot: TelegramBot & ServiceWithLocator = injectServiceLocator<TelegramBot>(bot);

// Меню с командами бота
whatWhereWhenTgBot.setMyCommands(menuCommands);

whatWhereWhenTgBot.onText(/\/add_event/, addEventHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/events/, getEventsHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/when/, getNearestEventHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/add_bday/, createBirthdayHandler.bind(whatWhereWhenTgBot));
whatWhereWhenTgBot.onText(/\/bdays/, getBirthdaysHandler.bind(whatWhereWhenTgBot));

whatWhereWhenTgBot.on('callback_query', handleCallbackQuery);
whatWhereWhenTgBot.on('polling_error', handlePollingError);
