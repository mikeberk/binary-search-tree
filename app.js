const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    let sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    let start = 0;
    let end = sortedArr.length - 1;
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = new Node(sortedArr[mid]);
    root.left = this.buildTree(sortedArr.slice(0, mid));
    root.right = this.buildTree(sortedArr.slice(mid + 1));
    return root;
  }
}
