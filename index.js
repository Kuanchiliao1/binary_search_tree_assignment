const Node = (data) => {
  let right = null
  let left = null

  const getRight = () => {
    return right
  }

  const getLeft = () => {
    return left
  }

  const getData = () => {
    return data
  }

  const setRight = (value) => {
    right = value
  }

  const setLeft = (value) => {
    left = value
  }

  return {
    getData,
    setLeft,
    setRight,
    getLeft,
    getRight
  }
};

const Tree = (array) => {
  let sortedArray = [...new Set(array)].sort((a, b) => a - b)
  let root = buildTree(sortedArray)

  function buildTree(array) {
    if (array.length === 0) return null
    let start = 0
    let mid = Math.floor((start + array.length - 1) / 2)

    const node = Node(array[mid])

    const leftArr = array.slice(start, mid)
    const rightArr = array.slice(mid + 1)
    
    node.setLeft(buildTree(leftArr))
    node.setRight(buildTree(rightArr))
    
    return node
  }

  const insert = (value, node = root) => {
    // if value is the same as root value,
    // return "value already exists!"    
    if (node.getData() === value) {
      return "Value already exists!"
    }

    if (value < node.getData()) {
      if (node.getLeft()) {
        node = insert(value, node.getLeft())  
      } else {
        node.setLeft(Node(value))
        return
      }
    } else {
      if (node.getRight()) {
        node = insert(value, node.getRight())      
      } else {
        node.setRight(Node(value))
        return
      }
    }
    // if value is not the same,
    // set root value to the correct direction and call again

    return node
    // base case
    // return when value is not same AND node === null
  }

  const findNode = (value, node = root) => {
    if (node === null) return
    if (node.getData() === value) {
      return node
    }

    let found = findNode(value, node.getLeft()) || findNode(value, node.getRight())

    return found
      ? found
      : "No matches found!"
  }

  const deleteNode = (value, node = root, parent = root) => {
    if (node === null) return
    const rightNode = node.getRight()
    const leftNode = node.getLeft()
    
    if (value === node.getData()) {
      
      console.log('found match!!', node.getData())
      console.log('parent: ', node.getData())

      if (rightNode && leftNode) {
        // If there are two childen
        let leftmostChild = rightNode
        while (leftmostChild.getLeft() !== null) {
          leftmostChild = leftmostChild.getLeft()
        }
        
        const rightChildofLeftmostChild = leftmostChild.getRight() || null
        if (leftmostChild.getData() === rightNode.getData()) {
          leftmostChild.setLeft(leftNode)
          console.log('testing match')
        } else {
          rightNode.setLeft(rightChildofLeftmostChild)
          leftmostChild.setRight(rightNode)
          leftmostChild.setLeft(leftNode)
        }

        if (node === root) {
          console.log("node is equal to root!")
          node = leftmostChild
        } else {
          parent.getData() > value
          ? parent.setLeft(leftmostChild)
          : parent.setRight(leftmostChild)
          console.log('leftmost: ', leftmostChild.getData())
        }
        
        
        if (rightChildofLeftmostChild) {
          console.log('rcolmc', rightChildofLeftmostChild.getData())
        } else {
          console.log('rcolmc', rightChildofLeftmostChild)
        }
        
      } else if (rightNode || leftNode) {
        // If there is one child
        const child = rightNode || leftNode
        parent.getData() > value
          ? parent.setLeft(child)
          : parent.setRight(child)
      } else {
      	// If there is no child
        childCount = 0
        parent.getData() > value
          ? parent.setLeft(null)
          : parent.setRight(null)
      }
      
      return
    }
    
    deleteNode(value, node.getRight(), node)
    deleteNode(value, node.getLeft(), node)

    // Pseudocode
    // if value found
      // check how many children
        // Implementation...
          // node.leftChild = left, node.rightChild = right
          // if (left && right) { ... } (both)
          // if (left || right) { ... } (one)
          // else { ... }
        // if zero => delete
          // save parent element
          // 
        // if one
          // save parent element
          // let direction = direction of deleted element relative to parent
          // let child = child element of to be deleted element
          // link parent to child of deleted element in the same direction
        // if two
          // save parent element
          // let direction = direction of deleted child relative to parent
          // let rightChild = immediate right child of the deleted element
          // let leftmostChild = keep iterating down until I find the
          // leftmost leaf of that right child
          // link parent to leftmostChild
    // if value not found
      // return "value not found!"
  }

  const levelOrder = (node = root) => {
    const queue = []
    const array = []
    queue.push(root)

    while (queue.length >= 1) {
      const currentNode = queue.shift()
      array.push(currentNode.getData())
      
      const left = currentNode.getLeft()
      const right = currentNode.getRight()
      
      if (left) {
        queue.push(left)
      }
      if (right) {
        queue.push(right)
      }
    }

    return array
    // Push root into the queue
    // if root has children
      // push those into the queue(left then right)
      // call the function again
    // base case root === null
      // return 
    // ex: root is 12
      // queue = [12]
      // 12 gets shifted from array and children are added
      // arr = [12]
      // queue = [6, 18]
      // 6 gets shifted
      // arr = [12, 6]
      // queue = [18, 3, 9]
      // 18 gets shifted
      // arr = [12, 6, 18]
      // queue = [3, 9, 15, 22]
  }

  return {
    root,
    sortedArray,
    insert,
    deleteNode,
    findNode,
    levelOrder
  }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.getRight() !== null) {
    prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
  if (node.getLeft() !== null) {
    prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = Tree(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
)

prettyPrint(tree.root)
tree.deleteNode(21)
prettyPrint(tree.root)
console.log(tree.findNode(3), tree.findNode(3).getData())
console.log(tree.levelOrder())
