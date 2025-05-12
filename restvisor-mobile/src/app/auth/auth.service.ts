import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error((error as Error).message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  // Get current user
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
