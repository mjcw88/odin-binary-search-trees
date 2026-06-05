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
        const nodes = [3, 7, 23, 6345];

        nodes.forEach(v => expect(tree.includes(v)).toBe(true));
    })
})

describe("Tree (insert)", () => {
    test("throws type error from non-number data type", () => {
        const tree = new Tree([0]);
        expect(() => tree.insert("0")).toThrow(TypeError);
    })
    test("inserts nodes from 1 node tree", () => {
        const tree = new Tree([4]);
        const inserts = [1, 7];

        inserts.forEach(v => tree.insert(v));
        inserts.forEach(v => expect(tree.includes(v)).toBe(true));
    })
    test("inserts nodes from multi node tree", () => {
        const array = [1, 4, 8, 5, 9, 67, 324];
        const tree = new Tree(array);
        const inserts = [3, 7, 23, 6345];

        inserts.forEach(v => tree.insert(v));
        inserts.forEach(v => expect(tree.includes(v)).toBe(true));
    })
    test("inserts nodes whilst preserving order", () => {
        const array = [7, 4, 23, 8, 3, 67, 6345];
        const tree = new Tree(array);
        const inserts = [1, 5, 9, 324];
        inserts.forEach(v => tree.insert(v));
        inserts.forEach(v => expect(tree.includes(v)).toBe(true));
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

describe("Tree (deleteItem)", () => {
    test("throws type error from non-number data type", () => {
        const tree = new Tree([0]);
        expect(() => tree.deleteItem("0")).toThrow(TypeError);
    })
    test("deletes node from 1 node tree", () => {
        const value = 4;
        const tree = new Tree([value]);
        tree.deleteItem(value);
        expect(tree.includes(value)).toBe(false);
    })
    test("deletes node with no children", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const toDelete = [3, 7, 23, 6345];
        const remaining = array.filter(v => !toDelete.includes(v));

        toDelete.forEach(v => tree.deleteItem(v));
        toDelete.forEach(v => expect(tree.includes(v)).toBe(false));
        remaining.forEach(v => expect(tree.includes(v)).toBe(true));
    })
    test("deletes node with 1 child", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const toDelete = [1, 5, 9, 324];
        const remaining = array.filter(v => !toDelete.includes(v));

        toDelete.forEach(v => tree.deleteItem(v));
        toDelete.forEach(v => expect(tree.includes(v)).toBe(false));
        remaining.forEach(v => expect(tree.includes(v)).toBe(true));
    })
    test("deletes node with 2 children", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const toDelete = [4, 67];
        const remaining = array.filter(v => !toDelete.includes(v));

        toDelete.forEach(v => tree.deleteItem(v));
        toDelete.forEach(v => expect(tree.includes(v)).toBe(false));
        remaining.forEach(v => expect(tree.includes(v)).toBe(true));
    })
    test("doesn't delete anything if value is not tree", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        tree.deleteItem(420);
        tree.deleteItem(69);
        tree.deleteItem(42069);
        const values = [];
        const inOrder = (node) => {
            if (node === null) return;
            inOrder(node.left);
            values.push(node.data);
            inOrder(node.right);
        };
        inOrder(tree.root);
        expect(values.length).toBe(array.length);
    })
})

describe("Tree (levelOrderForEach)", () => {
    test("doesn't accept no callback", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(() => tree.levelOrderForEach()).toThrow(Error);
    })
    test("breadth-first level traversal (converts to string and concatenates)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        let string = "";
        tree.levelOrderForEach(value => string = string + value + " ");
        expect(string).toEqual("8 4 67 1 5 9 324 3 7 23 6345 ");
    })
    test("breadth-first level traversal (adds to array)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.levelOrderForEach(value => values.push(value));
        expect(values).toEqual([8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]);
    })
    test("breadth-first level traversal (add to array and double each value)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.levelOrderForEach(value => values.push(value * 2));
        expect(values).toEqual([16, 8, 134, 2, 10, 18, 648, 6, 14, 46, 12690]);
    })
})

describe("Tree (inOrderForEach)", () => {
    test("doesn't accept no callback", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(() => tree.inOrderForEach()).toThrow(Error);
    })
    test("In-order traversal (converts to string and concatenates)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        let string = "";
        tree.inOrderForEach(value => string = string + value + " ");
        expect(string).toEqual("1 3 4 5 7 8 9 23 67 324 6345 ");
    })
    test("In-order traversal traversal (adds to array)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.inOrderForEach(value => values.push(value));
        expect(values).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
    })
    test("In-order traversal traversal (add to array and double each value)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.inOrderForEach(value => values.push(value * 2));
        expect(values).toEqual([2, 6, 8, 10, 14, 16, 18, 46, 134, 648, 12690]);
    })
})

describe("Tree (preOrderForEach)", () => {
    test("doesn't accept no callback", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(() => tree.preOrderForEach()).toThrow(Error);
    })
    test("Pre-order traversal (converts to string and concatenates)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        let string = "";
        tree.preOrderForEach(value => string = string + value + " ");
        expect(string).toEqual("8 4 1 3 5 7 67 9 23 324 6345 ");
    })
    test("Pre-order traversal traversal (adds to array)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.preOrderForEach(value => values.push(value));
        expect(values).toEqual([8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]);
    })
    test("Pre-order traversal traversal (add to array and double each value)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.preOrderForEach(value => values.push(value * 2));
        expect(values).toEqual([16, 8, 2, 6, 10, 14, 134, 18, 46, 648, 12690]);
    })
})

describe("Tree (postOrderForEach)", () => {
    test("doesn't accept no callback", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(() => tree.postOrderForEach()).toThrow(Error);
    })
    test("Post-order traversal (converts to string and concatenates)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        let string = "";
        tree.postOrderForEach(value => string = string + value + " ");
        expect(string).toEqual("3 1 7 5 4 23 9 6345 324 67 8 ");
    })
    test("Post-order traversal traversal (adds to array)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.postOrderForEach(value => values.push(value));
        expect(values).toEqual([3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]);
    })
    test("Post-order traversal traversal (add to array and double each value)", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        const values = [];
        tree.postOrderForEach(value => values.push(value * 2));
        expect(values).toEqual([6, 2, 14, 10, 8, 46, 18, 12690, 648, 134, 16]);
    })
})

describe("Tree (height)", () => {
    test("throws type error from non-number data type", () => {
        const tree = new Tree([0]);
        expect(() => tree.height("0")).toThrow(TypeError);
    })
    test("returns undefined from value not found", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.height(420)).toBe(undefined);
    })
    test("returns 3 from node 8", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.height(8)).toBe(3);
    })
    test("returns 2 from node 4", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.height(4)).toBe(2);
    })
    test("returns 1 from node 9", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.height(9)).toBe(1);
    })
    test("returns 0 from node 6345", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.height(6345)).toBe(0);
    })
})

describe("Tree (depth)", () => {
    test("throws type error from non-number data type", () => {
        const tree = new Tree([0]);
        expect(() => tree.height("0")).toThrow(TypeError);
    })
    test("returns undefined from value not found", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.depth(420)).toBe(undefined);
    })
    test("returns 3 from node 6345", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.depth(6345)).toBe(3);
    })
    test("returns 2 from node 9", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.depth(9)).toBe(2);
    })
    test("returns 1 from node 4", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.depth(4)).toBe(1);
    })
    test("returns 0 from node 8", () => {
        const array = [1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324];
        const tree = new Tree(array);
        expect(tree.depth(8)).toBe(0);
    })
})