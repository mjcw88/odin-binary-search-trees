import { Tree } from "./tree.js";

describe("Tree (buildTree)", () => {
    test("returns empty array", () => {
        const tree = new Tree();
        expect(tree.buildTree([])).toBe(undefined);
    })
    test("throws error for non-array data type", () => {
        const tree = new Tree();
        expect(() => tree.buildTree("Hello, World!")).toThrow(TypeError);
        expect(() => tree.buildTree(123)).toThrow(TypeError);
    })
    test("builds 1 node tree", () => {
        const tree = new Tree();
        const array = [0];
        const builtTree = tree.buildTree(array);
        expect(builtTree).toBe(tree.root);
        expect(builtTree).toBe(array[0]);
    })
    test("builds 3 node tree", () => {
        const tree = new Tree();
        const array = [7, 1, 4];
        const builtTree = tree.buildTree(array);
        expect(builtTree).toBe(tree.root);
        expect(builtTree).toBe(array[1]);
        expect(tree.root.left).toBe(array[2]);
        expect(tree.root.right).toBe(array[1]);
    })
    test("builds large node tree", () => {
        const tree = new Tree();
        const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
        const builtTree = tree.buildTree(array);
        expect(builtTree).toBe(tree.root);
        expect(builtTree).toBe(array[0]);
    })
})