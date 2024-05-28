class Node {
    constructor (value = null, nextNode = null) {
        this.value = value
        this.nextNode = nextNode
    }
}

class LinkedList {

    constructor(linkedList = {}) {
        this.linkedList = linkedList
    }

    // adds a new node containing value to the end of the list
    append(value) {
        if (Object.keys(this.linkedList).length === 0) {
            this.linkedList = new Node(value)
        } else {
            let current = this.linkedList;
            while (current.nextNode !== null) {
                current = current.nextNode;
            }
            current.nextNode = new Node(value)
        }
    }

    // adds a new node containing value to the start of the list
    prepend(value) {
        let main = new Node(value)
        main.nextNode = this.linkedList
        this.linkedList = main
    }

    // returns the total number of nodes in the list
    size() {
        let num = 0
        if (Object.keys(this.linkedList).length === 0) {
            return num
        } else {
            num = 1
            let current = this.linkedList;
            while (current.nextNode !== null) {
                current = current.nextNode;
                ++num
            }
            return num
        }    
    }

    // returns the first node in the list
    head() {
        return this.linkedList.value
    }

    // returns the last node in the list
    tail() {
        let current = this.linkedList;
        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        return current.value
    }

    // returns the node at the given index
    at(index) {
        if (index > this.size() - 1) {
            return 'Out of Bound'
        }
        let level = 0
        let current = this.linkedList;
        while (level !== index) {
            try {
                current = current.nextNode;
                ++level
            } catch {
                return undefined
            }

        }
        return current.value
    }

    // removes the last element from the list
    pop () {
        let previous = null
        let current = this.linkedList
        for (let i = 0; i < this.size() - 1; ++i) {
            previous = current
            current = current.nextNode
        }
        previous.nextNode = null
    }

    // returns true if the passed in value is in the list and otherwise returns false.
    contains (check) {
        let current = this.linkedList;
        while (current !== null)  {
            if (current.value == check) {
                return true
            }
            current = current.nextNode;
        }
        return false
    }

    // returns the index of the node containing value, or null if not found.
    find(value) {
        let index = 0
        let current = this.linkedList;
        while (current !== null) {
            if (current.value == value) {
                return index
            }
            ++ index
            current = current.nextNode;
        }
        return null
    }

    // represents your LinkedList objects as strings, so you can print them out and preview them in the console
    toString() {
        let print = ''
        let current = this.linkedList;
        while (current !== null) {
            print += `( ${current.value} ) --> `
            current = current.nextNode
        }
        print +=  'null'
        return print
    }
}

let linked = new LinkedList()

linked.append(1)
linked.append(2)
linked.append(3)
linked.prepend(4)