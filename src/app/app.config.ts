import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './enviroments/firebase.config';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({ projectId: "restvisor-887b9", appId: "1:674854508849:web:dd6b8ca735af7f4ab07810", databaseURL: "https://restvisor-887b9-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "restvisor-887b9.firebasestorage.app", apiKey: "AIzaSyDHAtQI2VBlhvYI8Vtmy7Pk2LqBUy4O1cM", authDomain: "restvisor-887b9.firebaseapp.com", messagingSenderId: "674854508849", measurementId: "G-Z6GVHFKTXD" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
