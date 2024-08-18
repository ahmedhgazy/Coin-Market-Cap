import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
    provideHttpClient,
    withFetch,
    withInterceptors,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LoadingService } from './shared/loading/loading.service';
import { MessagesService } from './shared/messages/messages.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        importProvidersFrom(HttpClientModule),
        BrowserAnimationsModule,
        provideAnimationsAsync(),
        provideAnimationsAsync(),
        provideAnimationsAsync(),
        provideAnimationsAsync(),
        provideCharts(withDefaultRegisterables()),
        provideHttpClient(withFetch()),
        LoadingService,
        MessagesService,
    ],
};
