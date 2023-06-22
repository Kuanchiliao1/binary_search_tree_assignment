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

  const buildTree = (array) => {
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

  return {
    root: buildTree(sortedArray),
    sortedArray
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

prettyPrint(Tree(
  [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 346, 234, 523]
).root)