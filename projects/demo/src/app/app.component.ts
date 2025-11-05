import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxOmniviewComponent, OmniviewFormat } from 'ngx-omniview';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [NgxOmniviewComponent, MarkdownModule, FormsModule],
  templateUrl: './app.component.html',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngx-omniview demo';
  
  // For "Try Yourself!" section
  selectedFormat: OmniviewFormat = 'text';
  userContent = '';
  copyButtonText = 'Copy';

  
  copyToClipboard() {
    const codeText = `<omniview [data]="content" [format]="'${this.selectedFormat}'"></omniview>`;
    navigator.clipboard.writeText(codeText).then(() => {
      this.copyButtonText = 'Copied!';
      setTimeout(() => {
        this.copyButtonText = 'Copy';
      }, 1500);
    });
  }
  
  // Sample content for testing
  textContent = [
    'Hello World!',
    'This is a simple text content.',
    'Line breaks are preserved.',
    '',
    'This library supports multiple formats!'
  ].join('\n');

  htmlContent = [
    '<h1>HTML Content</h1>',
    '<p>This is <strong>bold</strong> and <em>italic</em> text.</p>',
    '<ul>',
    '  <li>List item 1</li>',
    '  <li>List item 2</li>',
    '  <li>List item 3</li>',
    '</ul>',
    '<p><a href="https://angular.dev" target="_blank">Link to Angular</a></p>',
    '',
    'This library supports HTML format!'
  ].join('\n');
  
  markdownContent = [
    '# Markdown Example',
    '## Features',
    '- Item 1',
    '- Item 2',
    '- Item 3',
    '',
    '**Bold text** and *italic text*',
    '',
    'Inline Math $E = mc^2$, in between a line of text.',
    '',
    'and Block Math:',
    '$$',
    'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    '$$',
    '',
    'This library supports Markdown format!'
  ].join('\n');

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

  mathjaxContent = [
    '$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$'
  ].join('\n');

  latexContent = [
    '\\documentclass{article}',
    '\\usepackage{amsmath}',
    '',
    '\\title{Sample LaTeX Document}',
    '\\author{ngx-omniview Demo}',
    '\\date{\\today}',
    '',
    '\\begin{document}',
    '\\maketitle',
    '',
    '\\section{Introduction}',
    'This is a sample LaTeX document rendered using \\texttt{latex.js}.',
    '',
    '\\section{Mathematical Content}',
    'We can include inline math: $E = mc^2$ and display equations:',
    '',
    '\\begin{equation}',
    '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    '\\end{equation}',
    '',
    '\\section{Lists and Formatting}',
    '\\begin{itemize}',
    '  \\item First item with \\textbf{bold text}',
    '  \\item Second item with \\emph{italic text}',
    '  \\item Third item with \\texttt{monospace}',
    '\\end{itemize}',
    '',
    '\\section{Conclusion}',
    'This demonstrates that \\texttt{ngx-omniview} can render full LaTeX documents!',
    '',
    '\\end{document}'
  ].join('\n');

}
