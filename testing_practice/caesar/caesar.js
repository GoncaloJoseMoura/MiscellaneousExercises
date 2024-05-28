function caesarCipher(str, n) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const lower = [...alphabet]
    const upper = [...alphabet.toUpperCase()]
    caesar = ''

    for (let i = 0; i < str.length; ++i) {
        if (lower.indexOf(str.at(i)) != -1) {
            const index = (lower.indexOf(str.at(i)) + n)%(alphabet.length)
            caesar += lower[index]
        } else if (upper.indexOf(str.at(i)) != -1) {
            const index = (upper.indexOf(str.at(i)) + n)%(alphabet.length)
            caesar += upper[index]
        } else {
            caesar += str.at(i)
        }
    }
    return caesar
}


module.exports = caesarCipher