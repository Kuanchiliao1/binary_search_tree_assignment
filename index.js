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
    let end = array.length - 1
    let mid = Math.floor((start + end) / 2)

    const node = Node(array[mid])

    let leftArr = array.slice(start, mid)
    let rightArr = array.slice(mid + 1)
    
    console.log({rightArr, leftArr, mid: array[mid]})
    
    node.setLeft(buildTree(leftArr))
    node.setRight(buildTree(rightArr))
    
    // find start
    // find end
    // find the midpoint
    // set the root to the midpoint
    // set the left 
    // base case: start > end
    
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

  const deleteNode = (value, node = root, parent = root) => {
    if (node === null) return
    const rightNode = node.getRight()
    const leftNode = node.getLeft()
    
    if (value === node.getData()) {
      console.log('found match!!', node.getData())
      console.log(parent.getData())
      parent.getData() > value
        ? parent.setLeft(null)
        : parent.setRight(null)
      
      //let childNum = 0
      //for (let i = 0; i < 3; i++) {
        
      //}
      
      return
    }
    
    deleteNode(value, node.getRight(), node)
    deleteNode(value, node.getLeft(), node)

    
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

  return {
    root,
    sortedArray,
    insert,
    deleteNode
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
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
)

prettyPrint(tree.root)
console.log(tree.insert(10))
console.log(tree.insert(11))
prettyPrint(tree.root)

console.log(tree.deleteNode(11))
prettyPrint(tree.root)


