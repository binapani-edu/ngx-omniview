<div align="center">

# ngx-omniview

[![Angular](https://img.shields.io/badge/Angular-15--20-red.svg?logo=angular&logoColor=white)](https://angular.io)
[![NPM version](https://img.shields.io/npm/v/ngx-omniview.svg?logo=npm&logoColor=white)](https://www.npmjs.com/package/ngx-omniview)
[![License: MIT](https://img.shields.io/npm/l/ngx-omniview.svg?color=green&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Downloads](https://img.shields.io/npm/dt/ngx-omniview.svg?logo=npm&logoColor=white)](https://npmcharts.com/compare/ngx-omniview?minimal=true)
<br>
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white)](https://github.com/binapani-edu/ngx-omniview)
[![Website](https://img.shields.io/badge/Website-binapani.com-0078D4?logo=googlechrome&logoColor=white)](https://www.binapani.com)
[![YouTube](https://img.shields.io/badge/YouTube-Binapani%20Edu-FF0000?logo=youtube&logoColor=white)](https://www.youtube.com/@binapani_edu)

[![NPM](https://nodei.co/npm/ngx-omniview.svg)](https://nodei.co/npm/ngx-omniview/)

**A universal content viewer for Angular**
Renders any raw string input as Plain Text, HTML, Markdown, LaTeX, MathJax, JSON, and more... all from a single component.

</div>

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

MIT © [Binapani LTD](https://www.binapani.com/)

---

<div align="center">

• [Report Bug](https://github.com/binapani-edu/ngx-omniview/issues) • [Request Feature](https://github.com/binapani-edu/ngx-omniview/issues) • [View on NPM](https://www.npmjs.com/package/ngx-omniview) •

Made with ❤️ for Angular

</div>
