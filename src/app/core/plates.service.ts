import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

export interface Plate {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    available: boolean;
    supervisorUid: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlatesService {
    constructor(private firestore: Firestore) { }

    async addPlate(plate: Plate): Promise<string> {
        const platesRef = collection(this.firestore, 'plates');
        const docRef = await addDoc(platesRef, plate);
        return docRef.id;
    }

    async getPlatesBySupervisor(supervisorUid: string): Promise<Plate[]> {
        const platesRef = collection(this.firestore, 'plates');
        const q = query(platesRef, where('supervisorUid', '==', supervisorUid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Plate));
    }

    async updatePlate(plateId: string, plate: Partial<Plate>): Promise<void> {
        const plateRef = doc(this.firestore, 'plates', plateId);
        await updateDoc(plateRef, plate);
    }

    async deletePlate(plateId: string): Promise<void> {
        const plateRef = doc(this.firestore, 'plates', plateId);
        await deleteDoc(plateRef);
    }

    async togglePlateAvailability(plateId: string, available: boolean): Promise<void> {
        const plateRef = doc(this.firestore, 'plates', plateId);
        await updateDoc(plateRef, { available });
    }
} 