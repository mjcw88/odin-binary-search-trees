import { Tree } from "./classes/tree.js";

const createRandomArray = () => {
    const SIZE = 20;
    const MAX = 101;
    const array = [];

    for(let i = 0; i < SIZE; i++) {
        array.push(Math.floor(Math.random() * MAX))
    }
    return array;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) return;

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const array = createRandomArray();
const tree = new Tree(array);
const REPEAT = 150;

console.log("-".repeat(REPEAT));
prettyPrint(tree.root);
console.log("Is balanced: " + tree.isBalanced());

const values = [150, 101, 666, 6345, 12940];
values.forEach(v => {
    tree.insert(v);
})

console.log("-".repeat(REPEAT));
prettyPrint(tree.root);
console.log("Is balanced: " + tree.isBalanced());

tree.rebalance();

console.log("-".repeat(REPEAT));
prettyPrint(tree.root);
console.log("Is balanced: " + tree.isBalanced());

let string = "";
console.log("-".repeat(REPEAT));
tree.levelOrderForEach(value => string = string + value + " ");
console.log("Level Order: " + string);

string = "";
console.log("-".repeat(REPEAT));
tree.preOrderForEach(value => string = string + value + " ");
console.log("Pre-order: " + string);

string = "";
console.log("-".repeat(REPEAT));
tree.postOrderForEach(value => string = string + value + " ");
console.log("Post-order: " + string);

string = "";
console.log("-".repeat(REPEAT));
tree.inOrderForEach(value => string = string + value + " ");
console.log("In-order: " + string);