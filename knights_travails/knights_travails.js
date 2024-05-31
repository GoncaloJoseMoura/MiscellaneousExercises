class Node {
    constructor(start, path = [], moveset = []) {
        this.start = start
        this.path = path
        this.moveset = moveset
    }
}

function possibleMoves(start, end, visited) {
    
    const arr = [[ 1, 2], [ 1,-2], [-1, 2], [-1,-2], [ 2, 1], [ 2,-1], [-2, 1], [-2,-1]]

    let possible = []

    for (const move of arr) {
        let X = start[0] + move[0]
        let Y = start[1] + move[1]

        if (X == end[0] && Y == end[1]) {
            return [end]
        } else if (X >= 0 && X < 8 && Y >= 0 && Y < 8 && !visited.has(JSON.stringify([X,Y]))) {
            possible.push([X, Y])
        }
    }

    return possible
}

function knightMoves(start, end) {

    if (start[0] == end[0] && start[1] == end[1]) {
        return `You made it in 0 moves! Here's your path: ${JSON.stringify([start])}`
    }

    let visited = new Set()
    visited.add(JSON.stringify(start))

    let node = new Node(start, [start])

    let queue = [node]
    while (queue[0] != undefined) {

        let possible_mv = []
        possible_mv = possibleMoves(queue[0].start, end, visited).map(value => {
            visited.add(JSON.stringify(value))
            return new Node(value, [...queue[0].path, value])
        })

        
        queue[0].moveset = possible_mv

        if (queue[0].moveset.length == 0) {
            queue.shift()
        } else if (JSON.stringify(queue[0].moveset[0].start) == JSON.stringify(end)) {
            let path = queue[0].moveset[0].path
            return `You made it in ${path.length - 1} moves! Here's your path: ${JSON.stringify(path)}`
        } else {
            queue.push(...queue[0].moveset)
            queue.shift()
        }
    }
    return node
}

console.log(knightMoves([3,3],[0,0])) // You made it in 3 moves! Here's your path: [[3,3],[2,1],[0,0]]
console.log(knightMoves([0,0],[0,0])) // You made it in 0 moves! Here's your path: [[0,0]]
console.log(knightMoves([0,0],[7,7])) // You made it in 7 moves! Here's your path: [[0,0],[1,2],[2,4],[3,6],[4,4],[5,6],[7,7]]
console.log(knightMoves([0,0],[1,2])) // You made it in 2 moves! Here's your path: [[0,0],[1,2]]
console.log(knightMoves([0,0],[3,3])) // You made it in 3 moves! Here's your path: [[0,0],[1,2],[3,3]]
console.log(knightMoves([3,3],[4,3])) // You made it in 4 moves! Here's your path: [[3,3],[4,5],[6,4],[4,3]]