/**
 * Supported content formats for rendering
 */
export type OmniviewFormat = 
  | 'text' 
  | 'html' 
  | 'markdown' 
  | 'latex' 
  | 'mathjax' 
  | 'json' 
  | 'code';

/**
 * Renderer function signature
 * Takes raw string data and returns rendered string output
 */
export type RendererFunction = (data: string) => string;

/**
 * Registry mapping format types to their renderer functions
 */
export type RendererRegistry = {
  [K in OmniviewFormat]: RendererFunction;
};

