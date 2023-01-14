import { LRUCache } from "../src/cache";

describe("lru cache", () => {
  it("should return undefined on cache miss", () => {
    const cache = new LRUCache(3);
    expect(cache.get("a")).toBeUndefined();
  });

  it("should return item on cache hit", () => {
    const cache = new LRUCache<number>(3);
    cache.put("a", 1);

    expect(cache.get("a")).toBe(1);
  });

  it("should replace item when put twice", () => {
    const cache = new LRUCache<number>(3);
    cache.put("a", 1);
    cache.put("a", 2);

    expect(cache.get("a")).toBe(2);
  });

  it("should remove least recently used item when cache is full (only puts)", () => {
    const cache = new LRUCache<number>(3);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);
    cache.put("d", 4);

    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
    expect(cache.get("d")).toBe(4);
  });

  it("should remove least recently used item when cache is full (with gets)", () => {
    const cache = new LRUCache<number>(3);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);
    cache.get("a");
    cache.get("b");
    cache.put("d", 4);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBeUndefined();
    expect(cache.get("d")).toBe(4);
  });

  it("should not remove least recently used item when new item replaces an existing one", () => {
    const cache = new LRUCache<number>(3);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);
    cache.put("b", 4);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(4);
    expect(cache.get("c")).toBe(3);
  });
});
