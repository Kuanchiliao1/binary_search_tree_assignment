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

  const setLeft = (value) {
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

  const buildTree = () => {
    const node = Node(3)
    node.setLeft(Node(2))
    return node
  }

  return {
    root: buildTree(),
    sortedArray
  }
}

console.log(Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))