# ngx-omniview

Universal content renderer for Angular. Display raw text as HTML, Markdown, LaTeX, MathJax, JSON, and more with a single component.

## Features

- ✅ **Multi-format support**: text, html, markdown, latex, mathjax, json, code
- ✅ **Angular 15-20 compatible**
- ✅ **Simple API**: Just pass data and format
- ✅ **Unstyled**: Adapts to your design
- ✅ **Lightweight**: Modular renderer architecture

## Installation

```bash
npm install ngx-omniview
```

### Peer Dependencies

To keep the bundle size minimal, `ngx-omniview` relies on several peer dependencies. 
Install the required dependencies based on the formats you intend to use.
If your project already includes any of them, you can skip installing those packages.

```bash
npm install katex@^0.16.25
npm install mathjax-angular@>=3.0.0
npm install ngx-markdown@>=17.0.0
```

**Note:** This library supports Angular versions 15 through 20.

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { NgxOmniviewComponent } from 'ngx-omniview';

@Component({
  selector: 'app-example',
  imports: [NgxOmniviewComponent],
  template: `<omniview [data]="content" [format]="'text'"></omniview>`
})
export class ExampleComponent {
  content = 'Hello World!';
}
```

### Supported Formats

```typescript
<omniview [data]="text" [format]="'text'"></omniview>
<omniview [data]="html" [format]="'html'"></omniview>
<omniview [data]="markdown" [format]="'markdown'"></omniview>
<omniview [data]="latex" [format]="'latex'"></omniview>
<omniview [data]="mathjax" [format]="'mathjax'"></omniview>
<omniview [data]="json" [format]="'json'"></omniview>
<omniview [data]="code" [format]="'code'"></omniview>
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `string` | `''` | Raw content to render |
| `format` | `OmniviewFormat` | `'text'` | Content format type |

### Types

```typescript
type OmniviewFormat = 
  | 'text' 
  | 'html' 
  | 'markdown' 
  | 'latex' 
  | 'mathjax' 
  | 'json' 
  | 'code';
```

## Development Status

| Format | Status |
|--------|--------|
| text | ✅ Implemented |
| html | ✅ Implemented |
| markdown | ✅ Implemented |
| latex | ✅ Implemented |
| mathjax | ✅ Implemented |
| json | ✅ Implemented |
| code | 🚧 In Progress |

## Contributing

Contributions welcome! See [GitHub repository](https://github.com/binapani-edu/ngx-omniview) for details.

## License

MIT
