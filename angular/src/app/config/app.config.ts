import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from "./app.routes";
import { httpErrorInterceptor } from "../core/interceptors/error/http-error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor]),
      withFetch() // Provides HttpClient for API calls
    ),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};

