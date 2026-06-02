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
    test("sorts and builds 3 node tree", () => {
        const array = [7, 1, 4];
        const tree = new Tree(array);
        expect(tree.root.data).toBe(4);
        expect(tree.root.left.data).toBe(1);
        expect(tree.root.right.data).toBe(7);
    })
    test("sorts and builds large node tree", () => {
        const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.root.data).toBe(8);
        expect(tree.root.left.data).toBe(4);
        expect(tree.root.right.data).toBe(67);
    })
    test("sorts and builds tree without duplicates", () => {
        const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
        const tree = new Tree(array);

        const values = [];
        const inOrder = (node) => {
            if (node === null) return;
            inOrder(node.left);
            values.push(node.data);
            inOrder(node.right);
        };
        inOrder(tree.root);

        const uniqueValues = [...new Set(values)];
        expect(values).toEqual(uniqueValues);
        expect(values).toEqual([...uniqueValues].sort((a, b) => a - b));
    });
})

describe("Tree (includes)", () => {
    test("throws type error from non-number data type", () => {
        const tree = new Tree([0]);
        expect(() => tree.includes("0")).toThrow(TypeError);
    })
    test("returns false from 1 node tree", () => {
        const tree = new Tree([0])
        expect(tree.includes(1)).toBe(false)
    })
    test("returns false from multi node tree", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.includes(2)).toBe(false)
    })
    test("returns true from 1 node tree", () => {
        const tree = new Tree([0])
        expect(tree.includes(0)).toBe(true)
    })
    test("returns true from multi node tree", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.includes(3)).toBe(true);
        expect(tree.includes(7)).toBe(true);
        expect(tree.includes(23)).toBe(true);
        expect(tree.includes(6345)).toBe(true);
    })
})

describe("Tree (insert)", () => {
    test("throws type error from non-number data type", () => {
        const tree = new Tree([0]);
        expect(() => tree.insert("0")).toThrow(TypeError);
    })
    test("inserts nodes from 1 node tree", () => {
        const tree = new Tree([4]);
        tree.insert(1);
        tree.insert(7);
        expect(tree.includes(1)).toBe(true);
        expect(tree.includes(7)).toBe(true);
    })
    test("inserts nodes from multi node tree", () => {
        const array = [1, 4, 8, 5, 9, 67, 324];
        const tree = new Tree(array);
        tree.insert(3);
        tree.insert(7);
        tree.insert(23);
        tree.insert(6345);
        expect(tree.includes(3)).toBe(true);
        expect(tree.includes(7)).toBe(true);
        expect(tree.includes(23)).toBe(true);
        expect(tree.includes(6345)).toBe(true);
    })
    test("inserts nodes whilst preserving order", () => {
        const array = [7, 4, 23, 8, 3, 67, 6345];
        const tree = new Tree(array);
        tree.insert(1);
        tree.insert(5);
        tree.insert(9);
        tree.insert(324);
        expect(tree.includes(1)).toBe(true);
        expect(tree.includes(5)).toBe(true);
        expect(tree.includes(9)).toBe(true);
        expect(tree.includes(324)).toBe(true);
        const values = [];
        const inOrder = (node) => {
            if (node === null) return;
            inOrder(node.left);
            values.push(node.data);
            inOrder(node.right);
        };
        inOrder(tree.root);
        expect(values).toEqual([...values].sort((a, b) => a - b));
    });
    test("tree doesn't add node if it's already in the tree", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.includes(1)).toBe(true);
        tree.insert(1);
        const values = [];
        const inOrder = (node) => {
            if (node === null) return;
            inOrder(node.left);
            values.push(node.data);
            inOrder(node.right);
        };
        inOrder(tree.root);
        expect(values.length).toBe(array.length);
    });
})