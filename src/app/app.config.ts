import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [    
    provideAuth0({
      domain: 'dev-5rr0ura21d44zwze.us.auth0.com',
      clientId: 'e4ThO0PN9decMU3vHP5uDzdQKMASeRIO',
      cacheLocation: 'localstorage',
      
  }),provideRouter(routes), provideClientHydration(), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()
  ]
};
