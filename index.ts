import { INode, List } from "./linkedList";

class HashMap {
  private _length = 0;
  private _capacity = 4;
  private _loadFactor = 0.75;
  private _buckets: List.LinkedList<INode>[] | null[] = new Array(
    this._capacity
  ).fill(null);

  private growCapacity() {
    const entries = this.entries();

    if (entries) {
      this.clear((this._capacity *= 2));

      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }

  private hash(key: string): number {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  private index(key: string): number {
    const index = this.hash(key) % this._capacity;
    if (index < 0 || index >= this._capacity) {
      throw new Error("Trying to access index out of bound");
    }
    return index;
  }

  public set(key: string, value: any): void {
    const i = this.index(key);

    if (!this._buckets[i]) {
      const list = new List.LinkedList<INode>();
      list.append({ key, value });
      this._buckets[i] = list;
      this._length++;
      return;
    }

    if (this._buckets[i]?.containsKey(key)) {
      const index = this._buckets[i]?.findIndex(key);
      this._buckets[i]?.removeAt(index as number);
      this._buckets[i]?.insertAt({ key, value }, index as number);
      return;
    }

    this._buckets[i]?.append({ key, value });
    this._length++;

    if (this._length >= this._capacity * this._loadFactor) {
      this.growCapacity();
    }
  }

  public get(key: string): any {
    const i = this.index(key);

    if (!this._buckets[i]) {
      return null;
    }

    const index = this._buckets[i]?.findIndex(key);

    if (index === null) {
      return null;
    }

    const node = this._buckets[i]?.at(index as number);
    return node?.data?.value;
  }

  public has(key: string): boolean {
    const i = this.index(key);

    if (!this._buckets[i]) {
      return false;
    }

    return this._buckets[i]?.containsKey(key) as boolean;
  }

  public remove(key: string): void {
    const i = this.index(key);

    if (!this._buckets[i]) return;

    const index = this._buckets[i]?.findIndex(key);
    this._buckets[i]?.removeAt(index as number);
    this._length--;
  }

  public length() {
    return this._length;
  }

  public clear(capacity: number = this._capacity): void {
    this._buckets = new Array(capacity).fill(null);
    this._length = 0;
  }

  public keys(): string[] | null {
    if (!this._length) return null;
    let keys: string[] = [];
    this._buckets.forEach((item) => {
      if (item) {
        const bucketKeys = item.getKeys();
        keys.push(...bucketKeys);
      }
    });
    return keys;
  }

  public values(): any[] | null {
    if (!this._length) return null;
    let values: any[] = [];
    this._buckets.forEach((item) => {
      if (item) {
        const bucketValues = item.getValues();
        values.push(...bucketValues);
      }
    });
    return values;
  }

  public entries(): any[] | null {
    if (!this._length) return null;
    let entries: any[] = [];
    this._buckets.forEach((item) => {
      if (item) {
        const bucketEntries = item.getEntries();
        entries.push(...bucketEntries);
      }
    });
    return entries;
  }
}

const hashTable = new HashMap();

hashTable.set("rafet", { name: "rafet", lastName: "basturk" });
hashTable.set("esma", ["esma", "first"]);
hashTable.set("zeynep", "second");
hashTable.set("a", 1);
// hashTable.set("b", 2);
// hashTable.set("c", 3);
// hashTable.set("d", 4);
// hashTable.set("e", 5);
// hashTable.set("f", 6);
// hashTable.set("a", 7);

// console.log("has rafet: ", hashTable.has("rafet"));
// console.log("get rafet: ", hashTable.get("rafet"));

// hashTable.remove("rafet");

// console.log(hashTable.length());
// console.log(hashTable.keys());
// console.log(hashTable.values());
// console.log(hashTable.entries());
