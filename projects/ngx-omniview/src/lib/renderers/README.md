# Renderers

This folder contains all content renderers for the ngx-omniview library. Each renderer is responsible for transforming raw string data into a specific format.

## Structure

```
renderers/
├── index.ts                # Public exports
├── renderer.types.ts       # Type definitions
├── renderer.registry.ts    # Central registry
├── text.renderer.ts        # (DONE) Text renderer implementation
├── html.renderer.ts        # (TODO) HTML renderer
├── markdown.renderer.ts    # (TODO) Markdown renderer
├── latex.renderer.ts       # (TODO) LaTeX renderer
├── mathjax.renderer.ts     # (TODO) MathJax renderer
├── json.renderer.ts        # (TODO) JSON renderer
└── code.renderer.ts        # (TODO) Code renderer
```

## Adding a New Renderer

### Step 1: Create Renderer File

Create a new file: `[format].renderer.ts`

```typescript
import { RendererFunction } from './renderer.types';

/**
 * [Format] Renderer
 * 
 * Brief description of what this renderer does.
 * 
 * @param data - Raw string content
 * @returns Rendered string output
 */
export const render[Format]: RendererFunction = (data: string): string => {
  // Your rendering logic here
  return transformedData;
};
```

### Step 2: Register in Registry

Update `renderer.registry.ts`:

```typescript
import { render[Format] } from './[format].renderer';

export const rendererRegistry: RendererRegistry = {
  // ... existing renderers
  [format]: render[Format],
};
```

### Step 3: Export from Index

Update `index.ts`:

```typescript
export * from './[format].renderer';
```

### Step 4: Add Tests

Create `[format].renderer.spec.ts`:

```typescript
import { render[Format] } from './[format].renderer';

describe('[Format] Renderer', () => {
  it('should render [format] content', () => {
    const input = '...';
    const expected = '...';
    expect(render[Format](input)).toBe(expected);
  });
});
```

## Example: Text Renderer

See `text.renderer.ts` for the simplest example:

```typescript
export const renderText: RendererFunction = (data: string): string => {
  return data; // No transformation needed
};
```

## Guidelines

1. **Keep it simple**: Each renderer should do one thing well
2. **No side effects**: Renderers should be pure functions
3. **Handle edge cases**: Empty strings, null, undefined, etc.
4. **Document thoroughly**: Add JSDoc comments explaining behavior
5. **Add tests**: Every renderer should have unit tests
6. **External dependencies**: If needed, add them as peer dependencies

## Current Status

| Format | Status | Renderer File | External Deps |
|--------|--------|---------------|---------------|
| text | ✅ Implemented | `text.renderer.ts` | None |
| html | 🔜 Planned | - | Angular DomSanitizer |
| markdown | 🔜 Planned | - | `marked` |
| latex | 🔜 Planned | - | `mathjax` |
| mathjax | 🔜 Planned | - | `mathjax` |
| json | 🔜 Planned | - | None |
| code | 🔜 Planned | - | `highlight.js` |

## Contributing

We welcome contributions! To add support for a new format:

1. Fork the repository
2. Create a new renderer file following the structure above
3. Register it in the registry
4. Add tests
5. Update this README
6. Submit a pull request

For questions or discussions, open an issue on GitHub.

