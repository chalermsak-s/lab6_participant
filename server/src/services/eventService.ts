import type { Event } from '../models/event'
import * as repo from '../repository/eventRepositoryPrisma'

export function getEventByCategory(category: string) {
  return repo.getEventByCategory(category)
}

export function getAllEvents() {
  return repo.getAllEventsWithOrganizer()
}

export function getEventById(id: number) {
  return repo.getEventById(id)
}

export function getParticipantId(id: number) {
  return repo.getParticipantId(id)
}

export function addEvent(newEvent: Event) {
  return repo.addEvent(newEvent)
}

export async function getAllEventsWithPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const pageEvents = await repo.getAllEventsWithOrganizerPagination(
    keyword,
    pageSize,
    pageNo
  )
  return pageEvents
}

export function getAllParticipants() {
  return repo.getAllParticipants()
}

export async function getAllParticipantPage(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const PageParticipant = await repo.getAllParticipantPage(
    keyword,
    pageSize,
    pageNo
  )
  return PageParticipant
}

export function countPartipant() {
  return repo.countParticipant()
}

export function count() {
  return repo.countEvent()
}
