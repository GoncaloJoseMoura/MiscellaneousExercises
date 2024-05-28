const calculator = require('./calculator');


describe('test arithmetic operations', () => {
    test('addition', () => {
        expect(calculator.add(1,1)).toEqual(2)
    });
    test('subtraction', () => {
        expect(calculator.subtract(1,1)).toEqual(0)
    });
    test('multiplication', () => {
        expect(calculator.multiply(1,1)).toEqual(1)
    });
    test('division', () => {
        expect(calculator.divide(1,1)).toEqual(1)
    });
})