import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
  	provideRouter(routes),
  	provideHttpClient(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(
          environment.firebaseInicializer
        ))
      ), importProvidersFrom(provideStorage(() => getStorage())
    )
  ]
};
