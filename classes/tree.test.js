import { Tree } from "./tree.js";

describe("Tree (buildTree)", () => {
    test("throws range error for empty array", () => {
        expect(() => new Tree([])).toThrow(RangeError);
    })
    test("throws type error for non-array data type", () => {
        expect(() => new Tree("Hello, World!")).toThrow(TypeError);
        expect(() => new Tree(123)).toThrow(TypeError);
    })
    test("throws type error for array containing non-integer data type", () => {
        expect(() => new Tree(["Hello, World!", 0, 1, 2])).toThrow(TypeError);
    })
    test("builds 1 node tree", () => {
        const array = [0];
        const tree = new Tree(array);
        expect(tree.root.data).toBe(array[0]);
    })
    test.skip("sorts and builds 3 node tree", () => {
        const array = [7, 1, 4];
        const tree = new Tree(array);
        expect(tree.root.data).toBe(array[2]);
        expect(tree.root.left.data).toBe(array[0]);
        expect(tree.root.right.data).toBe(array[1]);
    })
    test.skip("sorts and builds large node tree", () => {
        const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.root.data).toBe(8);
    })
})