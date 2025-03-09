import type { Event } from "./event";
export interface Participant{
    id:number
    name: string | null
    email: string | null
    events: Event[]
}

export interface PageParticipant {
    count: number
    participants: Participant[]
}
