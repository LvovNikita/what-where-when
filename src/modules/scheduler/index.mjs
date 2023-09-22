import * as cron from 'node-cron'

cron.schedule('0 10 * * *', () => {
  // TODO:
})

cron.schedule('*/10 * * * * *', () => {
  console.log('TEST');
})