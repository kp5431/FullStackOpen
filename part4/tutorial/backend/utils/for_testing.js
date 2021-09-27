const palindrome = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = (array) => {
    const reducer = (sum, item) => { 
        return sum + item
    }
    const divisor = array.length == 0 ? 1 : array.length
    return array.reduce(reducer, 0) / divisor //reducer method sums the els in the array and returns it
}

module.exports = {
    palindrome,
    average
}