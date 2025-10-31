import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { MathjaxModule } from 'mathjax-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      MarkdownModule.forRoot(),
      MathjaxModule.forRoot()
    ),
  ]
};
