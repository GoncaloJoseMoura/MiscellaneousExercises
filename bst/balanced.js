class Node {
    constructor (data, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {

    constructor(input) {
        this.root = this.reset(input)
    }

    static prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    mergeSort(obj) {

        if (obj.length == 1) {
            return obj
        } else if (obj.length == 2) {
            if (obj[0] > obj[1]) {
                return [obj[1], obj[0]]
            } else {
                return obj
            }
        } else {
            const A = this.mergeSort(obj.slice(0, Math.floor(obj.length/2)))
            const B = this.mergeSort(obj.slice(Math.floor(obj.length/2)))
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

    duplicates(data) {

        const arr = []
        for (let i = 0; i < data.length; ++i) {
            if (!arr.includes(data[i])) {
                arr.push(data[i])
            }
        }
        return arr
    }

    buildTree(data) {
        let mid = Math.ceil((data.length - 1) / 2)

        if (data.length === 0) {
            return null
        }

        return new Node(data[mid], this.buildTree(data.slice(0, mid)), this.buildTree(data.slice(mid + 1)))
    }

    reset(obj) {
        return this.buildTree(this.duplicates(this.mergeSort(obj)))
    }

    insert(value) {
        let direction = ''
        let prev = null
        let curr = this.root
        while(curr != null) {
            if (value > curr.data) {
                prev = curr
                curr = curr.right
                direction = 'right'
            } else if (value < curr.data) {
                prev = curr
                curr = curr.left
                direction = 'left'
            } else {
                return false
            }
        }
        prev[direction] = new Node(value)
        return true
    }

    deleteItem(value) {
        if (this.find(value, false)) {
            let {curr, prev, direction} = this.find(value, false)
            if (curr.left == null && curr.right == null) {
                prev[direction] = null
                return true
            } else if (curr.left == null && curr.right != null) {
                prev[direction] = curr.right
                return true
            } else if (curr.left != null && curr.right == null) {
                prev[direction] = curr.left
                return true
            } else {
                let sub_prev = curr
                let sub_curr = curr.right
                while(sub_curr.left != null) {
                    sub_prev = sub_curr
                    sub_curr = sub_curr.left
                }
                const new_node = sub_curr.data
                this.deleteItem(sub_curr.data)
                curr.data = new_node
                return true
            }
        }
        return false
    }

    find(value, prev_omit = true) {
        let counter = 0
        let prev = null
        let curr = this.root
        let direction = null
        while(curr != null) {
            if (value > curr.data) {
                ++counter
                prev = curr
                curr = curr.right
                direction = 'right'
            } else if (value < curr.data) {
                ++counter
                prev = curr
                curr = curr.left
                direction = 'left'
            } else {
                if (prev_omit) {
                    return curr
                }
                return {curr, prev, direction, counter}
            }
        }
        return false
    }

    depth(node) {
        const {counter} = this.find(node.data, false)
        return counter
    }

    height(node) {
        const leaf = this.leaf(node)
        const main_depth = this.depth(node)
        const depth = []

        if (leaf == node.data) {
            return 0
        } else {
            leaf.forEach(value => {
                depth.push(this.depth(value) - main_depth)
            })

            return Math.max(...depth)
        }
    }

    isBalanced() {
        const leaf = this.leaf(this.root)
        const depth = []

        if (leaf == this.root.data) {
            return true
        } else {
            leaf.forEach(value => {
                depth.push(this.depth(value))
            })

            return Math.abs(Math.min(...depth) - Math.max(...depth)) <= 1
        }
    }

    rebalance() {
        if (this.isBalanced()) {
            return false
        }
        this.root = this.reset(this.inOrder())
        return true
    }

    leaf(node) {
        if (node.left == null && node.right == null) {
          return node;
        } else if (node.left != null && node.right == null) {
          return this.leaf(node.left);
        } else if (node.left == null && node.right != null) {
          return this.leaf(node.right);
        } else {
            let left = this.leaf(node.left)
            let right = this.leaf(node.right)
            if (!Array.isArray(left)) {
                left = [left]
            }
            if (!Array.isArray(right)) {
                right = [right]
            }
            return [...left, ...right];
        }
      }

    levelOrder(callback = null, curr = this.root) {

        if (callback == null) {
            var arr = []
            callback = (node) => {arr.push(node.data)} 
        }
        let queue = [curr]
        while (queue[0] != undefined) {

            callback(queue[0])
            if (queue[0].right != null && queue[0].left != null) {
                queue.push( queue[0].left, queue[0].right)
                queue.shift()
            } else if (queue[0].right != null) {
                queue.push(queue[0].right)
                queue.shift()
            } else if(queue[0].left != null) {
                queue.push(queue[0].left)
                queue.shift()
            } else {
                queue.shift()
            }
        }
        if (arr != []) {
            return arr
        }
    }

    preOrder(callback = null, curr = this.root, arr = []) {

        if (curr == null) {
            return null
        }

        if (callback == null) {
            arr.push(curr.data)
        } else {
            callback(curr)
        }

        this.preOrder(callback, curr.left, arr)
        this.preOrder(callback, curr.right, arr)

        if (callback == null && curr == this.root) {
            return arr
        }
    }

    inOrder(callback = null, curr = this.root, arr = []) {

        if (curr == null) {
            return null
        }

        this.inOrder(callback, curr.left, arr)

        if (callback == null) {
            arr.push(curr.data)
        } else {
            callback(curr)
        }

        this.inOrder(callback, curr.right, arr)

        if (callback == null && curr == this.root) {
            return arr
        }
    }

    postOrder(callback = null, curr = this.root, arr = []) {

        if (curr == null) {
            return null
        }

        this.postOrder(callback, curr.left, arr)
        this.postOrder(callback, curr.right, arr)

        if (callback == null) {
            arr.push(curr.data)
        } else {
            callback(curr)
        }

        if (callback == null && curr == this.root) {
            return arr
        }

    }

}


let p = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
p.insert(7)
Tree.prettyPrint(p.root)

p.depth(p.root.left.left.left)