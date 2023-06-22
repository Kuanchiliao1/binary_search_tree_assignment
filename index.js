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