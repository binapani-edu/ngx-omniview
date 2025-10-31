import { renderMathjax } from './mathjax.renderer';

describe('MathJax Renderer', () => {
  it('should return the input string unchanged', () => {
    const input = '$x = 1$';
    const result = renderMathjax(input);
    expect(result).toBe(input);
  });

  it('should handle inline math syntax', () => {
    const input = 'The quadratic formula is $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$';
    const result = renderMathjax(input);
    expect(result).toBe(input);
    expect(result).toContain('$x =');
  });

  it('should handle block math syntax', () => {
    const input = 'Euler\'s Identity:\n$$e^{i\\pi} + 1 = 0$$';
    const result = renderMathjax(input);
    expect(result).toBe(input);
    expect(result).toContain('$$');
  });

  it('should handle empty string', () => {
    const result = renderMathjax('');
    expect(result).toBe('');
  });

  it('should handle complex LaTeX expressions', () => {
    const input = 'Integral: $\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$';
    const result = renderMathjax(input);
    expect(result).toBe(input);
    expect(result).toContain('\\int');
  });
});
