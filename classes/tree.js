import { Node } from "./node.js";

export class Tree {
    constructor(array = null) {
        this.root = this.#buildTree(array);
    }

    #isValid(array) {
        if (!Array.isArray(array)) throw new TypeError("Input must be an array");
        if (array.length === 0) throw new RangeError("Array cannot be empty");
        if (array.some((x) => typeof x !== "number")) throw new TypeError("Array must contain only integers");
    }

    #merge(left, right) {
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

    #mergeSort(array) {
        if (array.length === 1) return array;

        const middle = Math.ceil(array.length / 2);
        const leftSide = array.slice(0, middle);
        const rightSide = array.slice(middle, array.length);

        const sortedLeft = this.#mergeSort(leftSide);
        const sortedRight = this.#mergeSort(rightSide);
        
        return this.#merge(sortedLeft, sortedRight);
    }

    #build(array, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);

        root.left = this.#build(array, start, mid - 1);
        root.right = this.#build(array, mid + 1, end);

        return root;
    }

    #buildTree(array) {
        this.#isValid(array);
        const sortedArray = this.#mergeSort(array);

        const start = 0;
        const end = sortedArray.length - 1;

        return this.#build(sortedArray, start, end);
    }

    includes(value) {

    }

    insert(value) {

    }

    deleteItem(value) {

    }

    levelOrderForEach(callback) {

    }

    inOrderForEach(callback) {

    }

    preOrderForEach(callback) {

    }

    postOrderForEach(callback) {

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