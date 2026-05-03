import { describe, it, expect } from 'vitest';
import { sanitizeInput } from './utils';

describe('utils library', () => {
  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should remove HTML tags', () => {
    expect(sanitizeInput('<div>test</div>')).toBe('divtest/div');
  });

  it('should return empty string for null/undefined', () => {
    expect(sanitizeInput(null as unknown as string)).toBe('');
  });

  it('should truncate long strings', () => {
    const longString = 'a'.repeat(6000);
    expect(sanitizeInput(longString).length).toBe(5000);
  });
});
