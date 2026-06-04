import { Node } from "./node.js";

export class Tree {
    constructor(array = null) {
        this.root = this.#buildTree(array);
    }

    #isValid(array) {
        if (!Array.isArray(array)) throw new TypeError("Input must be an array");
        if (array.length === 0) throw new RangeError("Array cannot be empty");
        if (array.some((x) => typeof x !== "number")) throw new TypeError("Array must contain only numbers");
    }

    #isNumber(value) {
        if (typeof value !== "number") throw new TypeError("Input must be a number");
    }

    #isCallback(callback) {
        if (!callback) throw new Error("A callback is required");
    }

    #buildTree(array) {
        this.#isValid(array);

        const merge = (left, right) => {
            const sortedArray = [];
            let i = 0;
            let j = 0;

            while (i < left.length && j < right.length) {
                if (left[i] < right[j]) {
                    sortedArray.push(left[i]);
                    i++;
                } else if (right[j] < left[i]) {
                    sortedArray.push(right[j]);
                    j++;
                } else {
                    sortedArray.push(left[i]);
                    i++;
                    j++;
                }
            }
            sortedArray.push(...left.slice(i), ...right.slice(j));
            return sortedArray;
        }

        const mergeSort = (array) => {
            if (array.length === 1) return array;

            const middle = Math.ceil(array.length / 2);
            const leftSide = array.slice(0, middle);
            const rightSide = array.slice(middle, array.length);

            const sortedLeft = mergeSort(leftSide);
            const sortedRight = mergeSort(rightSide);
            
            return merge(sortedLeft, sortedRight);
        }

        const sortedArray = mergeSort(array);

        const start = 0;
        const end = sortedArray.length - 1;

        const build = (array, start, end) => {
            if (start > end) return null;

            const mid = Math.floor((start + end) / 2);
            const root = new Node(array[mid]);

            root.left = build(array, start, mid - 1);
            root.right = build(array, mid + 1, end);

            return root;
        }

        return build(sortedArray, start, end);
    }

    includes(value) {
        this.#isNumber(value);

        const depthFirstTraversal = (node, value) => {
            if (node === null) return false;
            if (node.data === value) return true;
            if (value < node.data) return depthFirstTraversal(node.left, value);
            if (value > node.data) return depthFirstTraversal(node.right, value);
        }

        return depthFirstTraversal(this.root, value);
    }

    insert(value) {
        this.#isNumber(value);

        const insertNode = (node, value) => {
            if (node === null) node = new Node(value);
            if (node.data > value) node.left = insertNode(node.left, value);
            if (node.data < value) node.right = insertNode(node.right, value);
            return node;
        }

        insertNode(this.root, value);
    }

    deleteItem(value) {
        this.#isNumber(value);

        const getSuccessor = (node) => {
            node = node.right;
            while (node !== null && node.left !== null) {
                node = node.left;
            }
            return node;
        }

        const deleteNode = (node, value) => {
            if (node === null) return node;
            if (node.data > value) node.left = deleteNode(node.left, value);
            if (node.data < value) node.right = deleteNode(node.right, value);
            if (node.data === value) {
                if (node.left === null) return node.right;
                if (node.right === null) return node.left;

                const successor = getSuccessor(node);
                node.data = successor.data;
                node.right = deleteNode(node.right, successor.data);
            }
            return node;
        }

        this.root = deleteNode(this.root, value);
    }

    levelOrderForEach(callback) {
        if (!callback) throw new Error("A callback is required");
        if (!this.root) return;

        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            
            callback(node.data);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrderForEach(callback) {
        this.#isCallback(callback);
        if (!this.root) return;

        const inOrder = (node) => {
            if (node === null) return;
            inOrder(node.left);
            callback(node.data);
            inOrder(node.right);
        };
        inOrder(tree.root);
    }

    preOrderForEach(callback) {
        this.#isCallback(callback);
        if (!this.root) return;

        const preOrder = (node) => {
            if (node === null) return;
            callback(node.data);
            preOrder(node.left);
            preOrder(node.right);
        };
        preOrder(tree.root);
    }

    postOrderForEach(callback) {
        this.#isCallback(callback);
        if (!this.root) return;

        const postOrder = (node) => {
            if (node === null) return;
            postOrder(node.left);
            postOrder(node.right);
            callback(node.data);
        };
        postOrder(tree.root);
    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {

    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root);