import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map } from 'rxjs';

export type UserRole = 'employee' | 'supervisor' | 'admin';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable();

    constructor(private auth: Auth, private firestore: Firestore) {
        onAuthStateChanged(this.auth, (user) => this.userSubject.next(user));
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return signOut(this.auth);
    }

    get currentUser(): User | null {
        return this.auth.currentUser;
    }

    async register(email: string, password: string, extraData: any = {}) {
        const cred = await createUserWithEmailAndPassword(this.auth, email, password);

        // Guardar en Firestore (colección: "users", documento: UID del usuario)
        await setDoc(doc(this.firestore, 'users', cred.user.uid), {
            uid: cred.user.uid,
            email,
            ...extraData
        });
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