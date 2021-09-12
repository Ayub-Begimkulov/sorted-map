const defaultCompare = (a: any, b: any): number => (a > b ? 1 : a < b ? -1 : 0);

export class SortedMap<K, V> {
  root: Node<K, V> | null = null;
  size = 0;

  constructor(private compare = defaultCompare) {}

  get(key: K) {
    return this.findNode(this.root, key);
  }

  private findNode(node: Node<K, V> | null, key: K): V | undefined {
    if (!node) return;

    const compareResult = this.compare(key, node.key);

    if (compareResult > 0) {
      return this.findNode(node.right, key);
    } else if (compareResult < 0) {
      return this.findNode(node.left, key);
    } else {
      return node.value;
    }
  }

  has(key: K) {
    return !!this.get(key);
  }

  set(key: K, value: V) {
    this.root = this.insert(this.root, key, value);
  }

  delete(key: K) {
    this.root = this.deleteNode(this.root, key);
  }

  getMin() {
    return this.getMinNode(this.root)?.key;
  }

  private getMinNode(node: Node<K, V> | null) {
    if (!node) return;
    let result = node;

    while (result.left) {
      result = result.left;
    }

    return result;
  }

  getMax() {
    return this.getMaxNode(this.root)?.key;
  }

  private getMaxNode(node: Node<K, V> | null) {
    if (!node) return;
    let result = node;

    while (result.right) {
      result = result.right;
    }

    return result;
  }

  private insert(node: Node<K, V> | null, key: K, value: V) {
    if (!node) {
      this.size++;
      return new Node(key, value);
    }

    const compareResult = this.compare(key, node.key);

    if (compareResult > 0) {
      node.right = this.insert(node.right, key, value);
    } else if (compareResult < 0) {
      node.left = this.insert(node.left, key, value);
    } else {
      node.value = value;
    }

    // update node
    this.update(node);

    // balance the node
    return this.balance(node);
  }

  private deleteNode(node: Node<K, V> | null, key: K) {
    if (!node) {
      return null;
    }

    const compareResult = this.compare(node.key, key);

    if (compareResult > 0) {
      node.left = this.deleteNode(node.left, key);
    } else if (compareResult < 0) {
      node.right = this.deleteNode(node.right, key);
    } else {
      if (node.left && node.right) {
        const maxLeftNode = this.getMaxNode(node.left);
        if (maxLeftNode) {
          node.value = maxLeftNode.value;
          node.key = maxLeftNode.key;
          this.deleteNode(node.left, maxLeftNode.key);
        }
      } else if (node.left) {
        this.size--;
        return node.left;
      } else if (node.right) {
        this.size--;
        return node.right;
      } else {
        this.size--;
        return null;
      }
    }

    // update node
    this.update(node);

    // balance the node
    return this.balance(node);
  }

  private balance(node: Node<K, V>) {
    if (node.balanceFactor < -1) {
      if (node.left && node.left.balanceFactor <= 0) {
        // left-left case
        return this.leftLeftCase(node);
      } else {
        // left-right case
        return this.leftRightCase(node);
      }
    }
    if (node.balanceFactor > 1) {
      if (node.right && node.right.balanceFactor >= 0) {
        // right-right case
        return this.rightRightCase(node);
      } else {
        // right-left-case
        return this.rightLeftCase(node);
      }
    }
    return node;
  }

  private update(node: Node<K, V>) {
    const leftNodeHeight = node.left === null ? -1 : node.left.height;
    const rightNodeHeight = node.right === null ? -1 : node.right.height;

    node.height = Math.max(leftNodeHeight, rightNodeHeight) + 1;

    node.balanceFactor = rightNodeHeight - leftNodeHeight;
  }

  private leftLeftCase(node: Node<K, V>) {
    return this.rotateRight(node);
  }

  private leftRightCase(node: Node<K, V>) {
    node.left = this.rotateLeft(node.left);
    return this.rotateRight(node);
  }

  private rightRightCase(node: Node<K, V>) {
    return this.rotateLeft(node);
  }

  private rightLeftCase(node: Node<K, V>) {
    node.right = this.rotateRight(node.right);
    return this.rotateLeft(node);
  }

  private rotateRight(node: Node<K, V> | null) {
    if (!node) return null;
    const leftNode = node.left!;
    const leftNodeRightChild = node.left?.right || null;
    node.left = leftNodeRightChild;
    leftNode.right = node;
    this.update(node);
    this.update(leftNode);
    return leftNode;
  }

  private rotateLeft(node: Node<K, V> | null) {
    if (!node) return null;
    const rightNode = node.right!;
    const rightNodeLeftChild = node.right?.left || null;
    node.right = rightNodeLeftChild;
    rightNode.left = node;
    this.update(node);
    this.update(rightNode);
    return rightNode;
  }
}

class Node<K, V> {
  left: Node<K, V> | null = null;
  right: Node<K, V> | null = null;
  height: number = 0;
  balanceFactor: number = 0;
  key: K;
  value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}
