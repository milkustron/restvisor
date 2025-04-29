import { Timestamp } from "firebase/firestore";

export interface shift {
    date: Timestamp, 
    start: Timestamp,
    end: Timestamp,
    total: string, 
    state: 'ongoing' | 'finished',
}