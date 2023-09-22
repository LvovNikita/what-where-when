import { whatWhereWhenTgBot } from './bot.mjs'

import menuCommands from './data/menu.commands.json' assert { type: 'json' }
import eventsKeyboard from './data/events.keyboard.json' assert { type: 'json' }

// MENU COMMANDS
whatWhereWhenTgBot.setMyCommands(menuCommands)

// ADD EVENT
whatWhereWhenTgBot.onText(/\/add_event/, async (msg) => {
  const self = whatWhereWhenTgBot
  self.sendMessage(
    msg.chat.id, 
    `@${msg.chat.username} Какое событие запланируем?`, 
    { reply_markup: { inline_keyboard: eventsKeyboard } },
  )
});

// TODO: вынести
// MAPS & DICTIONARIES
whatWhereWhenTgBot.commandToResponseMessageMap = new Map([
  ['/annual', 'Формат события: ДД.ММ Название'],
  ['/monthly', 'Формат события: ДД Название'],
  ['/weekly', 'Формат события: 1–7 Название'],
  ['/one_time', 'Формат события: ДД.ММ.ГГГГ Название'],
  ['/special', 'Формат события: 3:2:04 = третий вторник апреля, вместо номера недели можно использовать first и last']    
])

// TODO: переместить в класс EventMessage
function getDateObjFromEventMessage(msg, eventType) {
  const dateObj = msg
    .text
    .substring(0, msg.text.indexOf(' '))
    .split(/\.|:/);

  console.log('dateObj')
  
  const result = {}
  
  if (eventType === 'annual') {
    Object.assign(result, { day: dateObj[0], month: dateObj[0] })
  } else if (eventType === 'monthly') {
    Object.assign(result, { day: dateObj[0] })
  } else if (eventType === 'weekly') {
    Object.assign(result, { dayOfTheWeek: dateObj[0] })
  } else if (eventType === 'one_time') {
    Object.assign(result, { day: dateObj[0], month: dateObj[1], year: dateObj[2] })
  } else if (eventType === 'special') {
    Object.assign(result, { week: dateObj[0], dayOfTheWeek: dateObj[1], month: dateObj[2] })
  } 

  return result
}

// TODO: переместить в класс EventMessage
function getSubjectFromEventMessage(msg) {
  return msg.text.substring(msg.text.indexOf(' ') + 1)
}

async function handleCreateEventCommand(bot, chatId, options, eventType) {
  const prompt = await bot.sendMessage(
    chatId,
    options.message,
    { reply_markup: { force_reply: true } }
  )
  bot.onReplyToMessage(chatId, prompt.message_id, async msg => {
    const subject = getSubjectFromEventMessage(msg)
    const dateObj = getDateObjFromEventMessage(msg, eventType)
    const event = bot.services.eventsService.constructEvent({ subject, ...dateObj, chatId, type: eventType });
    await bot.services.eventsService.save(event);
    // const result = await bot.services.eventsService.save(event);
    // console.log(result);
    await bot.services.eventNotificationsService.save({ event: { id: result.id }, date: event.nearestDate });
    bot.sendMessage(chatId, 'Событие успешно создано')
    bot.logger.info('Создано событие %s', msg.text)
  })
} 

// TODO: рефакторинг
whatWhereWhenTgBot.commandHandlers = {
  '/annual': async (chatId, options) => {
    await handleCreateEventCommand(whatWhereWhenTgBot, chatId, options, 'annual');  
  },
  '/monthly': async (chatId, options) => {
    await handleCreateEventCommand(whatWhereWhenTgBot, chatId, options, 'monthly');  
  },
  '/weekly': async (chatId, options) => {
    await handleCreateEventCommand(whatWhereWhenTgBot, chatId, options, 'weekly');  
  },
  '/one_time': async (chatId, options) => {
    await handleCreateEventCommand(whatWhereWhenTgBot, chatId, options, 'one_time');  
  },
  '/special': async (chatId, options) => {
    await handleCreateEventCommand(whatWhereWhenTgBot, chatId, options, 'special');  
  }
}

// HANDLE EVENT CREATION QUERY
whatWhereWhenTgBot.on('callback_query', async function (query) {
  const chatId = query.message.chat.id
  const command = query.data

  if (!this.commandToResponseMessageMap.has(command)) {
    return this.logger.error('on callback-query: No such command %s', command)
  }

  const responseMessage = this.commandToResponseMessageMap.get(command)

  const handler = this.commandHandlers[command]
  return handler.call(this, chatId, { message: responseMessage })
})

// TODO: два обработчика используют почти одинаковую логику!
whatWhereWhenTgBot.onText(/\/events/, async (msg) => {
  const self = whatWhereWhenTgBot;
  const chatId = msg.chat.id
  const eventsFromDb = await self.services.eventsService.getAll(chatId)
  const events = eventsFromDb.map(eventFromDb => self.services.eventsService.constructEvent(eventFromDb))
  const eventList = self.services.eventsService.constructEventList(events);
  self.sendMessage(
    chatId, 
    eventList.template || 'Нет предстоящих событий'
  );
})

// TODO: два обработчика используют почти одинаковую логику!
whatWhereWhenTgBot.onText(/\/when/, async (msg, match) => {
  const self = whatWhereWhenTgBot;
  const chatId = msg.chat.id
  const eventsFromDb = await self.services.eventsService.getAll(chatId)
  const events = eventsFromDb.map(eventFromDb => self.services.eventsService.constructEvent(eventFromDb))
  const eventList = self.services.eventsService.constructEventList(events);
  self.sendMessage(
    chatId, 
    eventList.closestEvent.template || 'Нет предстоящих событий'
  );
})

// TODO:
whatWhereWhenTgBot.onText(/\/add_bday/, (msg, match) => {
  const chatId = msg.chat.id
  whatWhereWhenTgBot.sendMessage(
    chatId, 
    'UNDER CONSTRUCTION'
  );
})

// TODO:
whatWhereWhenTgBot.onText(/\/bdays/, (msg, match) => {
  const chatId = msg.chat.id
  whatWhereWhenTgBot.sendMessage(
    chatId, 
    'UNDER CONSTRUCTION'
  );
})

// CATCH ERRORS

whatWhereWhenTgBot.on('polling_error', (err) => {
  botLogger.error('polling_error: %s', err.message)
})
