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

This library uses peer dependencies to keep the bundle size small. Install the required peer dependencies based on the formats you plan to use:

```bash
# For Markdown support
npm install ngx-markdown

```bash
# For KaTeX support (used by Markdown)
npm install katex
```

```bash
# For MathJax support
npm install mathjax-angular
```

```bash
# For LaTeX support
npm install latex.js

# ⚠️ Important: Angular 17+ users need to configure esbuild
# Add this to your angular.json under build options:
#   "loader": { ".keep": "empty" }
# See Setup Guide below for details
```

```bash
# For all formats
npm install ngx-markdown katex mathjax-angular latex.js
```

### ⚠️ LaTeX Format Setup (Important!)

If you're using the LaTeX format, you need to configure Angular's build system to handle latex.js correctly.

**Add this to your `angular.json` (Angular 17+ with application builder):**

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "loader": {
              ".keep": "empty"
            }
          }
        }
      }
    }
  }
}
```

This fixes a known issue with latex.js and modern bundlers. [More details here](https://github.com/michael-brade/LaTeX.js/issues/152).

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

### Format Examples

#### LaTeX Format

Full LaTeX document support powered by [latex.js](https://latex.js.org/):

**Supported Features:**
- ✅ Full document structure (`\documentclass`, `\begin{document}`, etc.)
- ✅ Sections, lists, tables, and text formatting
- ✅ Math equations (inline and display)
- ✅ Common packages (`amsmath`, `amsthm`, `graphicx`, etc.)
- ✅ Custom macros and theorems

**Known Limitations:**
- ❌ TikZ/PGF diagrams (requires native LaTeX compilation)
- ❌ Complex packages that depend on native LaTeX features
- ⚠️ Some advanced TeX constructs (LaTeX.js parses as context-free)

For math-only content (no document structure), consider using `format="mathjax"` instead.

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
| code | 🔜 Planned |

## Contributing

Contributions welcome! See [GitHub repository](https://github.com/binapani-edu/ngx-omniview) for details.

## License

MIT
