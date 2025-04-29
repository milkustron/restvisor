import { Timestamp } from "firebase/firestore";

export interface Shift {
    date: Timestamp, 
    start: Timestamp,
    end: Timestamp,
    total: string, 
    state: 'ongoing' | 'finished',
}