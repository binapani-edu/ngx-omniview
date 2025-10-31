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

**Bold text** and *italic text*

Inline math $E = mc^2$, in between a line of text.

and block math:
$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$
`;

  jsonContent = JSON.stringify({
    "text": "hello world",
    "number": 1,
    "fraction": 1.5,
    "boolean": true,
    "nullValue": null,
    "object": {
      "name": "object",
      "value": 42
    },
    "array": [1, 2, 3, "four", { "inside": "object in array" }],
    "nestedObject": {
      "name": "nested object",
      "level1": {
        "layer1": 1,
        "deeper": {
          "layer2": 2,
          "deep": {
            "layer3": 3
          }
        }
      },
      "level2": [0],
      "level3": {}
    },
    "listOfObjects": [
      { "id": 1, "label": "first" },
      { "id": 2, "label": "second", "extra": [10, 20, 30] },
      { "id": 3, "label": "third", "meta": { "active": true } }
    ]
  }, null, 2);

  mathjaxContent = `
$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$`;

}
