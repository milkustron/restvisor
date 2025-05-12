import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'restvisor-887b9',
        appId: '1:674854508849:web:dd6b8ca735af7f4ab07810',
        databaseURL:
          'https://restvisor-887b9-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'restvisor-887b9.firebasestorage.app',
        apiKey: 'AIzaSyDHAtQI2VBlhvYI8Vtmy7Pk2LqBUy4O1cM',
        authDomain: 'restvisor-887b9.firebaseapp.com',
        messagingSenderId: '674854508849',
        measurementId: 'G-Z6GVHFKTXD',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});
