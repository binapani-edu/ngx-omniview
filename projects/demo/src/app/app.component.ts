import { Component } from '@angular/core';
import { NgxOmniviewComponent } from 'ngx-omniview';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-root',
  imports: [NgxOmniviewComponent, MarkdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngx-omniview demo';
  
  // Sample content for testing
  textContent = `
Hello World!
This is a simple text content.
Line breaks are preserved.

This library supports multiple formats!`;

  htmlContent = `
<h1>HTML Content</h1>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
<p><a href="https://angular.dev" target="_blank">Link to Angular</a></p>`;
  
  markdownContent = `
# Markdown Example
## Features
- Item 1
- Item 2
- Item 3

**Bold text** and *italic text*`;

  jsonContent = JSON.stringify({
    name: 'ngx-omniview',
    version: '0.0.1',
    features: [
      {
        name: 'feature 1',
        description: 'description 1'
      },
      {
        name: 'feature 2',
        description: 'description 2'
      },
      {
        name: 'feature 3',
        description: 'description 3'
      }
    ]
  }, null, 2);
}
