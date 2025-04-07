import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User, onAuthStateChanged, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

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
}