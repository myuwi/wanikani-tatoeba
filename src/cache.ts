export class LRUCache<T = void> {
  private capacity: number;
  private cache: Map<string, T>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  public get(key: string): T | undefined {
    const value = this.cache.get(key);

    if (value) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }

    return value;
  }

  public put(key: string, value: T): void {
    if (this.cache.size >= this.capacity && !this.cache.has(key)) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}
