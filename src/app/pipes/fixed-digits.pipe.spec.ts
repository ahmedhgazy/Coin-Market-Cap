import { TruncateDecimalPipe } from './fixed-digits.pipe';

describe('truncateDecimal', () => {
    it('create an instance', () => {
        const pipe = new TruncateDecimalPipe();
        expect(pipe).toBeTruthy();
    });
});
