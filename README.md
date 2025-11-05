# ngx-omniview

A universal content viewer for Angular that renders raw string inputs as Plain Text, HTML, Markdown, LaTeX, MathJax, JSON, and more... all from a single component.

**Supports:** Angular 15-20 | **Status:** In Development

## Usage

```typescript
<omniview [data]="content" [format]="'markdown'"></omniview>
```

## Setup

```bash
npm install
ng build ngx-omniview    # Build library
ng serve demo            # Run demo app
```

## Development

| Command | Purpose |
|---------|---------|
| `ng build ngx-omniview` | Build the library |
| `ng build ngx-omniview --watch` | Hot build on changes (to use during development) |
| `ng build ngx-omniview --configuration production` | Build the library for production (final check before publish) |
| `ng test ngx-omniview` | Run library tests |
| `ng serve demo` | Run demo app at `http://localhost:4200` |

**Workflow:** After changing library code, rebuild with `ng build ngx-omniview` before testing in demo app.

## Project Structure

```
ngx-omniview/
├── projects/
│   ├── ngx-omniview/          # Library source (published to npm)
│   │   └── src/lib/
│   │       ├── renderers/     # Format renderers (text, html, markdown, etc.)
│   │       └── ngx-omniview.component.ts
│   └── demo/                  # Demo app (not published)
└── dist/ngx-omniview/         # Built library (after ng build)
```

## Contributing

**Adding a new format renderer?** See [renderers/README.md](projects/ngx-omniview/src/lib/renderers/README.md)

### Quick Guide:
1. Create `[format].renderer.ts` in `projects/ngx-omniview/src/lib/renderers/`
2. Register in `renderer.registry.ts`
3. Test in demo app
4. Submit PR

## Publishing

```bash
ng build ngx-omniview
cd dist/ngx-omniview
npm publish
```

## License

MIT
