import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Router } from '@angular/router';
import {Schedule} from "../models/schedule-model";

export type UserRole = 'worker' | 'supervisor';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  businessName: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable();

    constructor(
        private auth: Auth, 
        private firestore: Firestore,
        private router: Router
    ) {
        onAuthStateChanged(this.auth, (user) => {
            this.userSubject.next(user);
            if (user) {
                this.redirectBasedOnRole(user.uid);
            }
        });
    }

    private async redirectBasedOnRole(uid: string) {
        const userDoc = await getDoc(doc(this.firestore, 'users', uid));
        if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            switch (userData.role) {
                case 'supervisor':
                    await this.router.navigate(['/supervisor']);
                    break;
                case 'worker':
                    await this.router.navigate(['/worker']);
                    break;
                default:
                    await this.router.navigate(['/']);
            }
        }
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    async logout() {
        await signOut(this.auth);
        await this.router.navigate(['/']);
    }

    get currentUser(): User | null {
        return this.auth.currentUser;
    }

    async register(email: string, password: string, extraData: any = {}) {
        const cred = await createUserWithEmailAndPassword(this.auth, email, password);
        const uid = cred.user.uid;
        const userData = {
            uid,
            email,
            ...extraData
        };

        // Guardar en Firestore (colección: "users", documento: UID del usuario)
        await setDoc(doc(this.firestore, 'users', uid), userData);

        if (userData.role === 'worker') {
            const defaultSchedule: Schedule = {
                monday: "Monday: 09:00 - 17:00",
                tuesday: "Tuesday: 15:00 - 23:00",
                wednesday: "Wednesday: 08:30 - 16:30",
                thursday: "Thursday: 15:00 - 23:00",
                friday: "Friday: 08:30 - 16:30",
            };


            await setDoc(doc(this.firestore, 'workerSchedule', uid), {
                employeeId: uid,
                schedule: defaultSchedule
            });
        }


    }

    // Obtener los datos del usuario actual desde Firestore
    getUserData(): Observable<UserData | null> {
        const user = this.currentUser;
        if (!user) {
            return new BehaviorSubject<UserData | null>(null).asObservable();
        }

        return from(getDoc(doc(this.firestore, 'users', user.uid))).pipe(
            map(doc => {
                if (doc.exists()) {
                    return doc.data() as UserData;
                }
                return null;
            })
        );
    }

    // Obtener el rol del usuario actual
    getUserRole(): Observable<UserRole | null> {
        return this.getUserData().pipe(
            map(userData => userData?.role || null)
        );
    }

    // Verificar si el usuario tiene un rol específico
    hasRole(role: UserRole): Observable<boolean> {
        return this.getUserRole().pipe(
            map(userRole => userRole === role)
        );
    }
}