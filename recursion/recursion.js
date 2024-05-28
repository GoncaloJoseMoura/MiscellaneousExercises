// It will take a number and return the sum of all numbers from 1 up to the number passed in.
function sumRange(n) {
    if (n == 0) {
        return 0
    }
    return n + sumRange(n - 1)
}
console.log('Sum of 1 up to 3: ',sumRange(3)) // 6

// takes in a base and an exponent. If the exponent is 0, return 1.
function power(n, p) {
    if (p == 0) {
        return 1
    }
    return n * power(n, p-1)
} 

console.log('2 to the power of 4: ', power(2, 4)); // 16

// factorial of a number is the result of that number multiplied by the number before it, and so on, until you reach 1.
function factorial(n) {
    if (n == 1) {
        return 1
    }
    return n * factorial(n-1)
}

console.log('the factorial of 4: ', factorial(4)); // 16

// accepts an array and a callback and returns true if every value in the array returns true when passed as parameter to the callback function
function all(l, f, i = l.length - 1) {

    if (i == 0) {
        return f(l[0])
    }
    return f(l[i]) && all(l, f, --i)
}

let allAreLessThanSeven = all([1,2,9], num => num < 7)
console.log('is every number less than 7', allAreLessThanSeven)

function fibonacci(n) {
    if (n == 0) {
        return 0
    } else if (n == 1) {
        return 1
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

console.log('Fibonacci of 6: ',fibonacci(6)) // 8

function mergeSort(obj) {

    if (obj.length == 1) {
        return obj
    } else if (obj.length == 2) {
        if (obj[0] > obj[1]) {
            return [obj[1], obj[0]]
        } else {
            return obj
        }
    } else {
        const A = mergeSort(obj.slice(0, Math.floor(obj.length/2))) // [2,1] [1,2]
        const B = mergeSort(obj.slice(Math.floor(obj.length/2))) // [3,4] [3,4]
        let C = []

        let i = 0
        let j = 0
        let k = 0

        while (A.length - 1 >= i && B.length - 1>= j) {

            if (A[i] > B[j]) {
                C[k++] = B[j++]
            } else {
                C[k++] = A[i++]
            }
        }

        for (; A.length - 1 >= i; i++) {
            C[k++] = A[i] 
        }
        for (; B.length - 1 >= j; j++) {
            C[k++] = B[j] 
        }

        return C
    }
}