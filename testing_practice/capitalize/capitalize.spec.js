const capitalize = module.require('./capitalize')

describe('capitalize', () => {
    test('a single word', () => {
        expect(capitalize('hello')).toBe('Hello')
    });
    test('empty string', () => {
        expect(capitalize('')).toBe('')
    });
    test('word in capital letters', () => {
        expect(capitalize('HELLO')).toBe('Hello')
    });
    test('word that starts with a white space', () => {
        expect(capitalize(' hello')).toBe(' Hello')
    });
    test('two words', () => {
        expect(capitalize('hello world')).toBe('Hello world')
    })
}) 