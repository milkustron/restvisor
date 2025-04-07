import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './app/core/enviroment';

// Inicializa Firebase antes de arrancar la app
initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));