import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  async registerUser(
    email: string,
    password: string,
    role: string,
    profileData: any
  ): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    const userDoc = {
      uid,
      email,
      role,
      ...profileData
    };

    switch (profileData.role) {
      case 'supervisor':
        await this.router.navigate(['/supervisor']);
        break;
      case 'worker':
        await this.router.navigate(['/worker']);
        break;
      default:
        await this.router.navigate(['/']);
    }

    await setDoc(doc(this.firestore, 'users', uid), userDoc);
    return cred;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getUserProfile(uid: string): Observable<any> {
    return docData(doc(this.firestore, 'users', uid));
  }
}
