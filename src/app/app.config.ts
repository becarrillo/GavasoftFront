import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
  	provideRouter(routes),
  	provideHttpClient(),
    provideFirebaseApp(() => initializeApp(
        environment.firebaseInicializer
      )
    ),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ]
};
