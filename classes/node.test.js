import { Node } from "./node.js";

describe("Node creation", () => {
    test("creates a node with given data", () => {
        const value = 5;
        const node = new Node(value);
        expect(node.value).toBe(value);
    });
    test("left & right children are null by default", () => {
        const value = 5;
        const node = new Node(value);
        expect(node.left).toBeNull();
        expect(node.right).toBeNull();
    });
    test("data defaults to null when no argument given", () => {
        const node = new Node();
        expect(node.value).toBeNull();
    });
    test("left can be set to another node", () => {
        const value1 = 5;
        const value2 = 3;
        const node1 = new Node(value1);
        const node2 = new Node(value2);
        node1.left = node2;
        expect(node1.left).toBe(node2);
        expect(node1.left.value).toBe(value2);
    });
    test("right can be set to another node", () => {
        const value1 = 5;
        const value2 = 3;
        const node1 = new Node(value1);
        const node2 = new Node(value2);
        node1.right = node2;
        expect(node1.right).toBe(node2);
        expect(node1.right.value).toBe(value2);
    });
});