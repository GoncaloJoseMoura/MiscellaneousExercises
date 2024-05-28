function capitalize(str) {
    let new_str = ''
    for (let i = 0; i < str.length; ++i) {
        let code = str.charCodeAt(i)
        if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
            new_str += str.at(i).toUpperCase() + str.slice(i + 1).toLowerCase()
            return new_str
        } else {
            new_str += str.at(i)
        }
    }
    return new_str
}

// Do not edit below this line
module.exports = capitalize;
