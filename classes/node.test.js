import { Node } from "./node.js";

describe("Node creation", () => {
    test("creates a node with given data", () => {
        const data = 5;
        const node = new Node(data);
        expect(node.data).toBe(data);
    });
    test("left & right children are null by default", () => {
        const data = 5;
        const node = new Node(data);
        expect(node.left).toBeNull();
        expect(node.right).toBeNull();
    });
    test("data defaults to null when no argument given", () => {
        const node = new Node();
        expect(node.data).toBeNull();
    });
    test("left can be set to another node", () => {
        const data1 = 5;
        const data2 = 3;
        const node1 = new Node(data1);
        const node2 = new Node(data2);
        node1.left = node2;
        expect(node1.left).toBe(node2);
        expect(node1.left.data).toBe(data2);
    });
    test("right can be set to another node", () => {
        const data1 = 5;
        const data2 = 3;
        const node1 = new Node(data1);
        const node2 = new Node(data2);
        node1.right = node2;
        expect(node1.right).toBe(node2);
        expect(node1.right.data).toBe(data2);
    });
});