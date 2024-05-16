export interface INode {
  key: string;
  value: any;
}

export namespace List {
  class Node<T extends INode> {
    data: INode | null;
    next: Node<T> | null;

    constructor(data: INode | null = null, next: Node<T> | null = null) {
      this.data = data;
      this.next = next;
    }
  }

  export class LinkedList<T extends INode> {
    private head: Node<T> | null;
    private size: number;

    constructor() {
      this.head = null;
      this.size = 0;
    }

    append(data: INode): void {
      const newNode = new Node(data);
      if (this.size === 0) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current!.next) {
          current = current!.next;
        }
        current!.next = newNode;
      }
      this.size++;
    }

    prepend(data: INode): void {
      const newNode = new Node(data, this.head);
      this.head = newNode;
      this.size++;
    }

    getSize(): number {
      return this.size;
    }

    headNode(): Node<T> | null {
      return this.head;
    }

    tailNode(): Node<T> | null {
      if (!this.size) return null;
      let current = this.head;
      while (current!.next) {
        current = current!.next;
      }
      return current;
    }

    at(index: number): Node<T> | null {
      if (!this.size) return null;
      let current = this.head;
      let pos = 0;
      while (current) {
        if (pos === index) {
          return current;
        } else {
          current = current.next;
          pos++;
        }
      }
      return null;
    }

    shift(): void {
      if (!this.size) return;
      let current = this.head;
      this.head = current!.next;
      this.size--;
    }

    pop(): void {
      if (!this.size) return;
      if (this.size === 1) {
        this.head = null;
      } else {
        let current = this.head;
        while (current!.next!.next) {
          current = current!.next;
        }
        current!.next = null;
      }
      this.size--;
    }

    contains(value: T): boolean {
      let current = this.head;
      while (current) {
        if (current.data === value) {
          return true;
        }
        current = current.next;
      }
      return false;
    }

    containsKey(key: string): boolean {
      let current = this.head;

      while (current) {
        if (current.data?.key === key) {
          return true;
        }
        current = current.next;
      }

      return false;
    }

    getKeys() {
      let current = this.head;
      let keys = [];
      while (current) {
        if (current.data?.key) {
          keys.push(current.data?.key);
        }
        current = current.next;
      }
      return keys;
    }

    getValues() {
      let current = this.head;
      let values = [];
      while (current) {
        if (current.data?.value) {
          values.push(current.data?.value);
        }
        current = current.next;
      }
      return values;
    }

    getEntries() {
      let current = this.head;
      let entries = [];
      while (current) {
        if (current.data) {
          entries.push([current.data.key, current.data.value]);
        }
        current = current.next;
      }
      return entries;
    }

    findIndex(key: string): number | null {
      if (!this.size) return null;
      let current = this.head;
      let index = 0;
      while (current) {
        if (current.data?.key === key) {
          return index;
        }
        current = current.next;
        index++;
      }
      return null;
    }

    insertAt(value: T, index: number): void {
      if (index < 0 || index > this.size) return;
      if (index === 0) {
        this.prepend(value);
      } else if (index === this.size) {
        this.append(value);
      } else {
        let current = this.head;
        let prev: Node<T> | null = null;
        let pos = 0;
        const newNode = new Node(value);
        while (pos < index) {
          prev = current;
          current = current!.next;
          pos++;
        }
        newNode.next = current;
        if (prev) prev.next = newNode;
        this.size++;
      }
    }

    removeAt(index: number): void {
      if (index < 0 || index >= this.size) return;
      if (index === 0) {
        this.shift();
      } else {
        let prev = this.at(index - 1);
        if (prev && prev.next) prev.next = prev.next.next;
        this.size--;
      }
    }
  }
}
