import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  let pipe: TitleCasePipe;

  beforeEach(() => {
    pipe = new TitleCasePipe();
  });

  it('should transform a single word to title case', () => {
    const result = pipe.transform('angular');
    expect(result).toBe('Angular');
  });

  it('should transform multiple words to title case', () => {
    const result = pipe.transform('angular is awesome');
    expect(result).toBe('Angular Is Awesome');
  });

  it('should handle mixed-case input', () => {
    const result = pipe.transform('aNgULAR is aWEsome');
    expect(result).toBe('Angular Is Awesome');
  });

  it('should return an empty string when given an empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle strings with multiple spaces between words', () => {
    const result = pipe.transform('angular   is   awesome');
    expect(result).toBe('Angular   Is   Awesome');
  });

  it('should handle strings with leading and trailing spaces', () => {
    const result = pipe.transform('   angular is awesome   ');
    expect(result).toBe('   Angular Is Awesome   ');
  });

  it('should handle strings with special characters and numbers', () => {
    const result = pipe.transform('angular 123 & cool');
    expect(result).toBe('Angular 123 & Cool');
  });
});
