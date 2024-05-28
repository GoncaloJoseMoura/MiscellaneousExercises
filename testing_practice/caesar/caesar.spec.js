const caesarCipher = module.require('./caesar') 

describe('caesar cypher', () => {
    test('single word', () => {
        expect(caesarCipher('xyz', 3)).toBe('abc')
    });
    test('single word', () => {
        expect(caesarCipher('HeLLo', 3)).toBe('KhOOr')
    });
    test('single word', () => {
        expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!')
    });
})