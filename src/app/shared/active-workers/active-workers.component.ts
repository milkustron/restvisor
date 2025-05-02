import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common'; // ⬅️

@Component({
    selector: 'app-active-workers',
    standalone: true,
    imports: [CommonModule], // ⬅️ Añádelo aquí
    templateUrl: './active-workers.component.html',
    styleUrls: ['./active-workers.component.css']
})
export class ActiveWorkersComponent implements OnInit {
    private firestore = inject(Firestore);
    activeWorkers$: Observable<{ name: string, id: string }[]> = of([]);

    async ngOnInit() {
        const colRef = collection(this.firestore, 'workerShifts');
        const snapshot = await getDocs(colRef);

        const activeWorkerPromises = snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data() as any;
            const shiftsRef = collection(this.firestore, 'workerShifts', docSnap.id, 'shifts'); // subcolección
            const shiftSnaps = await getDocs(shiftsRef);

            const hasOngoingShift = shiftSnaps.docs.some(shift => shift.data()['state'] === 'ongoing');

            if (hasOngoingShift) {
                const userDoc = await getDoc(doc(this.firestore, 'users', data.employeeId));
                const userData = userDoc.exists() ? userDoc.data() : { name: 'Unknown' };
                return { id: data.employeeId, name: userData['name'] };
            }

            console.log('workerShifts:', snapshot.docs.length);
            console.log('shifts found:', shiftSnaps.docs.map(d => d.data()));


            return null;
        });

        const resolved = await Promise.all(activeWorkerPromises);
        this.activeWorkers$ = of(resolved.filter(Boolean) as { name: string, id: string }[]);
    }

}
