import { Timestamp } from "firebase/firestore";

export interface WorkerShifts {
    id: string, 
    employeeId: string,
    shifts: {
        date: Timestamp, 
        start: Timestamp,
        end: Timestamp,
        total: string, 
        state: 'ongoing' | 'finished',
    }
}