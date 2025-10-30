import { RendererFunction } from './renderer.types';

/**
 * JSON Renderer
 * 
 * Parses and pretty-prints JSON data for simple text display.
 * 
 * Note: The interactive JSON viewer component handles JSON display in the UI.
 * This renderer is registered for consistency but the main component handles
 * JSON parsing directly to pass objects to the viewer component.
 * 
 * @param data - Raw JSON string
 * @returns Pretty-printed JSON string or an error message
 * 
 * @example
 * ```typescript
 * const json = renderJson('{"a":1}');
 * // Output:
 * // {
 * //   "a": 1
 * // }
 * ```
 */
export const renderJson: RendererFunction = (data: string): string => {
  try {
    const obj = JSON.parse(data);
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    return `Invalid JSON:\n${data}`;
  }
};
