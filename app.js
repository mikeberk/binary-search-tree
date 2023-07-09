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

  #defaultTraversalFnc(n) {
    return n;
  }

  insert(val, root = this.root) {
    // compare val to root.data. if it's smaller, move left. if it's bigger, move right.
    // do it again until left and right of root are null
    if (root == null) {
      root = new Node(val);
      return root;
    }
    if (val < root.data) {
      root.left = this.insert(val, root.left);
    } else if (val > root.data) {
      root.right = this.insert(val, root.right);
    }
    return root;
  }

  delete(val, root = this.root) {
    // base case
    if (root == null) {
      return root;
    }

    // traverse BST until you reach node to delete
    if (val < root.data) {
      root.left = this.delete(val, root.left);
      return root;
    } else if (val > root.data) {
      root.right = this.delete(val, root.right);
      return root;
    }

    // single ancestor (or leaf)
    if (root.left == null) {
      let temp = root.right;
      root = null;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      root = null;
      return temp;
    } else {
      // Node has both children
      let succParent = root; // parent of successor is set to root AKA node to be deleted
      let succ = root.right; // successor is the right child of node to be deleted

      while (succ.left != null) {
        succParent = succ; // move the parent down one level to the left
        succ = succ.left; // move the successor down one level to the left
      }
      // check if right child was the next smallest node (NSN)
      if (succParent !== root) {
        succParent.left = succ.right; // replace the NSN's parent's left child with the NSN's right child
      } else {
        succParent.right = succ.right;
      }

      // replace node to be delete data with the NSN's data
      root.data = succ.data;
      // delete node and return root
      succ = null;
      return root;
    }
  }

  find(val, root = this.root) {
    if (root == null || root.data == val) {
      return root;
    }

    if (val < root.data) {
      return this.find(val, root.left);
    } else if (val > root.data) {
      return this.find(val, root.right);
    }
  }

  levelOrderTraversal(fnc = this.#defaultTraversalFnc) {
    let arr = [];
    if (this.root == null) return;
    let queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let currentNode = queue[0];
      arr.push(fnc(currentNode.data));
      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);
      queue.shift();
    }
    return arr;
  }

  preorder(fnc = this.#defaultTraversalFnc, node = this.root, result = []) {
    if (node == null) return;
    result.push(fnc(node.data));
    this.preorder(fnc, node.left, result);
    this.preorder(fnc, node.right, result);
    return result;
  }

  inorder(fnc = this.#defaultTraversalFnc, node = this.root, result = []) {
    if (node == null) return;
    this.inorder(fnc, node.left, result);
    result.push(fnc(node.data));
    this.inorder(fnc, node.right, result);
    return result;
  }

  postorder(fnc = this.#defaultTraversalFnc, node = this.root, result = []) {
    if (node == null) return;
    this.postorder(fnc, node.left, result);
    this.postorder(fnc, node.right, result);
    result.push(fnc(node.data));
    return result;
  }

  depth(node, root = this.root) {
    if (root === null) return -1;
    if (root === node) return 0;
    let left = this.depth(node, root.left);
    if (left > -1) {
      return 1 + left;
    }
    let right = this.depth(node, root.right);
    if (right > -1) {
      return 1 + right;
    }

    return -1;
  }

  height(node) {
    if (node === null) return -1;
    let left = this.height(node.left);
    let right = this.height(node.right);
    return Math.max(left, right) + 1;
  }

  isBalanced(node = this.root) {
    // A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
    if (node === null) return;
    let diff = Math.abs(this.height(node.left) - this.height(node.right));
    if (diff <= 1) {
      this.isBalanced(node.left);
      this.isBalanced(node.right);
      return true;
    } else {
      return false;
    }
  }

  reBalance() {
    if (!this.isBalanced()) {
      let treeArr = [];
      this.inorder((n) => treeArr.push(n));
      this.root = this.buildTree(treeArr);
    }
  }
}

function randomArr() {
  let arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

function randomGreaterThan100() {
  return 100 + Math.floor(Math.random() * 50);
}

(function Main() {
  let tree = new Tree(randomArr());
  prettyPrint(tree.root);
  console.log("Tree is balanced: ", tree.isBalanced());
  console.log("Level Order: ", tree.levelOrderTraversal());
  console.log("Inorder: ", tree.inorder());
  console.log("Preorder: ", tree.preorder());
  console.log("Postorder: ", tree.postorder());
  for (let i = 0; i < 6; i++) {
    tree.insert(randomGreaterThan100());
  }
  console.log("Tree is balanced: ", tree.isBalanced());
  tree.reBalance();
  console.log("Tree is balanced: ", tree.isBalanced());
  prettyPrint(tree.root);
  console.log("Level Order: ", tree.levelOrderTraversal());
  console.log("Inorder: ", tree.inorder());
  console.log("Preorder: ", tree.preorder());
  console.log("Postorder: ", tree.postorder());
})();
