import { Component } from '@angular/core';
import { NgxOmniviewComponent } from 'ngx-omniview';

@Component({
  selector: 'app-root',
  imports: [NgxOmniviewComponent],
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

  htmlContent = '<h1>HTML Content</h1><p>This is <strong>bold</strong> text.</p>';
  
  markdownContent = `# Markdown Example
## Features
- Item 1
- Item 2
- Item 3

**Bold text** and *italic text*`;

  jsonContent = JSON.stringify({
    name: 'ngx-omniview',
    version: '0.0.1',
    features: ['text', 'html', 'markdown', 'latex', 'mathjax']
  }, null, 2);
}
