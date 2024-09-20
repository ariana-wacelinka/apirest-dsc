import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Importamos HttpClient a nivel global
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Proveemos HttpClient aquí
    ...appConfig.providers  // Aseguramos que el resto de configuraciones se incluyan
  ]
}).catch(err => console.error(err));
