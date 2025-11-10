import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MathjaxModule } from 'mathjax-angular';
import { NgxOmniviewComponent } from './ngx-omniview.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';

@NgModule({
  declarations: [NgxOmniviewComponent, JsonViewerComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    MathjaxModule.forRoot({
      config: {
        tex2jax: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        messageStyle: 'none'
      }
    })
  ],
  exports: [NgxOmniviewComponent, MarkdownModule, MathjaxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxOmniviewModule {}
