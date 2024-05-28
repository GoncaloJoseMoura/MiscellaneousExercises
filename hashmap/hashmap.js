class Node {
    constructor (key = null, value = null) {
        this.key = key
        this.value = value
        this.nextNode = null

    }
}

class LinkedList {

    constructor(linkedList = {}) {
        this.linkedList = linkedList
    }

    // adds a new node containing value to the end of the list
    append(key, value) {
        if (Object.keys(this.linkedList).length === 0) {
            this.linkedList = new Node(key, value)
        } else {
            let current = this.linkedList;
            if (this.contains(key)) {
                while (current.key !== key) {
                    current = current.nextNode;
                }
                current.value = value
            } else {
                while (current.nextNode !== null) {
                    current = current.nextNode;
                }
                current.nextNode = new Node(key, value)
            }
        }
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

    // returns true if the passed in value is in the list and otherwise returns false.
    contains (check) {
        let current = this.linkedList;
        while (current !== null)  {
            if (current.key == check) {
                return true
            }
            current = current.nextNode;
        }
        return false
    }

    // returns the index of the node containing value, or null if not found.
    find(key) {
        if (this.contains(key)) { 
            let current = this.linkedList;
            while (current !== null) {
                if (current.key == key) {
                    return current.value 
                }
                current = current.nextNode;
            }
        }
        return null
    }

    remove(key) {
        if (this.contains(key)) {
            let previous = null;
            let current = this.linkedList;

            while (current.key !== key) {
                previous = current;
                current = current.nextNode;
            }

            if (previous === null) {
                this.linkedList = current.nextNode;
            } else {
                previous.nextNode = current.nextNode;
            }

            return true;
        }
        return false;
    }

    reconstruct() {
        const new_arr = this.deconstruct()
        this.clear()
        new_arr.forEach(key_value => {
            this.append(...key_value)
        })

    }

    clear() {
        this.linkedList = {}
        return true
    }

    deconstruct() {
        let arr = []
        let current = this.linkedList;
        while (current !== null) {
            arr.push([current.key, current.value])
            current = current.nextNode
        }
        return arr
    }
}

class Hash {

    constructor(hashmap = [], capacity = 26, loadFactor = 0.75) {
        this.hashmap = hashmap
        this.capacity = capacity
        this.loadFactor = loadFactor
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode%this.capacity;
      } 

    set(key, value) {
        if (this.length() >= this.capacity * this.loadFactor) {
            const tmp_data = this.entries()
            tmp_data.push([key, value])
            this.capacity *=2 
            this.clear()
            tmp_data.forEach(key_value => {
                this.set(key_value[0], key_value[1])
            })
        }

        let index = this.hash(key)

        if (this.hashmap[index] == undefined) {
            if (!this.has(key)) {
                this.hashmap[index] = new LinkedList()
                this.hashmap[index].append(key, value)
                return true
            }
            return false
        }
        this.hashmap[index].append(key, value)
        return true

    }

    get(key) {
        if (this.has(key)) {
            let index = this.hash(key)
            return this.hashmap[index].find(key)
        }
        return null
    }

    has(key) {
        let index = this.hash(key)
        try {
            if (this.hashmap[index].contains(key)) {
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    remove(key) {
        if (this.has(key)) {
            let index = this.hash(key)
            this.hashmap[index].remove(key)
            return true
        }
        return false
    }

    length() {
        let counter = 0
        for (let i = 0; i < this.hashmap.length; ++i) {
            try {
                counter += this.hashmap[i].size()
            } catch {
            } 
        }
        return counter
    }

    clear() {
        this.hashmap = []
    }

    keys() {
        let arr = []
        for (let i = 0; i < this.hashmap.length; ++i) {
            try {
                this.hashmap[i].deconstruct().forEach((value) => {
                    arr.push(value[0])
                })
            } catch {
            }
        }
        return arr
    }

    values() {
        let arr = []
        for (let i = 0; i < this.hashmap.length; ++i) {
            try {
                this.hashmap[i].deconstruct().forEach((value) => {
                    arr.push(value[1])
                })
            } catch {
            }
        }
        return arr
    }

    entries() {
        let arr = []
        for (let i = 0; i < this.hashmap.length; ++i) {
            try {
                this.hashmap[i].deconstruct().forEach((value) => {
                    arr.push(value)
                })
            } catch {
            }
        }
        return arr
    }
}

let p = new Hash()

p.set('A', 'Apple');
p.set('Arm', 'body')
p.set('B', 'Bear');
p.set('Bea', 'word')
p.set('C', 'Cat');
p.set('D', 'Dog');
p.set('E', 'Earth');
p.set('F', 'Fox');
p.set('G', 'Gorilla');
p.set('H', 'Hippo');
p.set('I', 'Iguana');
p.set('J', 'Jaguar');
p.set('K', 'Kangaroo');
p.set('L', 'Lion');
p.set('M', 'Monkey');
p.set('N', 'Nightingale');
p.set('O', 'Octopus');
p.set('P', 'Panda');
p.set('Q', 'Quail');
p.set('R', 'Rabbit');
p.set('S', 'Snake');
p.set('T', 'Tiger');
p.set('U', 'Umbrella');
p.set('V', 'Violin');
p.set('W', 'Whale');
p.set('X', 'Xylophone');
p.set('Y', 'Yak');
p.set('Z', 'Zebra');