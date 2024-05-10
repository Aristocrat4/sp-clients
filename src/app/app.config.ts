import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ClientEffects } from './state/clients/client.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { clientReducer } from './state/clients/client.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideEffects(),
    importProvidersFrom(
      ReactiveFormsModule,
      EffectsModule.forRoot([ClientEffects]),
      StoreModule.forRoot({
        clients: clientReducer,
      }),
      StoreDevtoolsModule.instrument()
    ),
  ],
};
