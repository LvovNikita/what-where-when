import { EventList } from 'modules/events/classes/event-list.class'
import { Event } from 'modules/events/classes/event.class'
import { EventEntity } from 'modules/events/entities/event.entity'
import { serviceLocator } from './../../../modules/serviceLocator'

const { EventsService } = serviceLocator

export async function getEventsList(id: number): Promise<EventList> {
  const eventEntities: EventEntity[] = await EventsService.findBySubscriberId(String(id))
  const events: Event[] = eventEntities.map((event: EventEntity) => EventsService.create.event(
    event.subject, 
    event.type, 
    event.subscriberId, 
    {
      year: event.year,
      month: event.month,
      date: event.date,
      day: event.day,
      week: event.week
    }
  ))
  return EventsService.create.eventList(events)
}
