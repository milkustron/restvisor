import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export type UserRole = 'worker' | 'supervisor';

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  businessName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  async signIn(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  async logout(): Promise<void> {
    await this.signOut();
    await this.router.navigate(['/']);
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      return onAuthStateChanged(this.auth, observer);
    });
  }

  getUserData(): Observable<UserData | null> {
    return this.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user) return of(null);
        const ref = doc(this.firestore, 'users', user.uid);
        return from(getDoc(ref)).pipe(
          map((snap) => (snap.exists() ? (snap.data() as UserData) : null))
        );
      })
    );
  }
}
