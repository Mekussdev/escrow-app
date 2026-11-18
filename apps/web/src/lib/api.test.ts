import { describe, expect, it } from 'vitest';
import { daysLeft, money, parseAmount } from './api';
import { CONTRACT_ERROR_CODES, errorText } from './errors';

describe('formatting', () => {
  it('formats money with two decimals and unknown tokens shortened', () => {
    expect(money('500000000', 'CABCDEF')).toBe('50.00 CABC…');
    expect(money('1', 'CABCDEF')).toBe('0.0000001 CABC…');
  });
  it('formats time left', () => {
    const now = Date.parse('2026-11-02T00:00:00Z');
    expect(daysLeft('2026-11-05T00:00:00Z', now)).toBe('3d left');
    expect(daysLeft('2026-11-02T05:00:00Z', now)).toBe('5h left');
    expect(daysLeft('2026-11-01T00:00:00Z', now)).toBe('deadline passed');
  });
  it('parses decimal filters without floating point loss', () => {
    expect(parseAmount('12.3456789')).toBe('123456789');
    expect(parseAmount('9007199254740993.1')).toBe('90071992547409931000000');
    expect(parseAmount('1.12345678')).toBeNull();
  });
  it('has user-facing text for every published contract error', () => {
    for (const code of CONTRACT_ERROR_CODES) expect(errorText(code, '')).not.toBe('');
  });
});
