import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Firestore, collection, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-active-workers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './active-workers.component.html',
    styleUrls: ['./active-workers.component.css']
})
export class ActiveWorkersComponent implements OnInit, OnDestroy {
    private firestore = inject(Firestore);
    private activeWorkersMap = new Map<string, { name: string, id: string }>();
    activeWorkers$ = new BehaviorSubject<{ name: string, id: string }[]>([]);

    private unsubscribes: (() => void)[] = [];

    ngOnInit() {
        const workerShiftsRef = collection(this.firestore, 'workerShifts');

        const unsubMain = onSnapshot(workerShiftsRef, (snapshot) => {
            // Cancelar antiguos listeners
            this.unsubscribes.forEach(unsub => unsub());
            this.unsubscribes = [];

            snapshot.docs.forEach((docSnap) => {
                const workerId = docSnap.id;
                const employeeId = docSnap.data()['employeeId'];
                const shiftsRef = collection(this.firestore, 'workerShifts', workerId, 'shifts');

                const unsubShifts = onSnapshot(shiftsRef, async (shiftsSnap) => {
                    const hasOngoing = shiftsSnap.docs.some(s => s.data()['state'] === 'ongoing');

                    if (hasOngoing) {
                        if (!this.activeWorkersMap.has(employeeId)) {
                            const userDoc = await getDoc(doc(this.firestore, 'users', employeeId));
                            const name = userDoc.exists() ? userDoc.data()?.['name'] : 'Unknown';
                            this.activeWorkersMap.set(employeeId, { name, id: employeeId });
                            this.updateActiveWorkers();
                        }
                    } else {
                        if (this.activeWorkersMap.has(employeeId)) {
                            this.activeWorkersMap.delete(employeeId);
                            this.updateActiveWorkers();
                        }
                    }
                });

                this.unsubscribes.push(unsubShifts);
            });
        });

        this.unsubscribes.push(unsubMain);
    }

    ngOnDestroy() {
        this.unsubscribes.forEach(unsub => unsub());
    }


    private updateActiveWorkers() {
        this.activeWorkers$.next(Array.from(this.activeWorkersMap.values()));
    }

}
