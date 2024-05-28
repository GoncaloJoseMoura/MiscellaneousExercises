const reverseString = require('./reverse') 

describe('Test if string has been reversed', () => {
    test('single word', () => {
        expect(reverseString('hello')).toBe('olleh')
    })
})