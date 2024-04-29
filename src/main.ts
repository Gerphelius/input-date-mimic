import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DateTimeComponent } from './date-time/date-time.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, DateTimeComponent],
  template: `
    <app-date-time />
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideAnimations(), importProvidersFrom(MatNativeDateModule)],
});
