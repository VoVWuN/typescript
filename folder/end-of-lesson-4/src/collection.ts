export class Collection<V, K extends number | string | symbol = string> {
  items: Partial<Record<K, V>> = {}

  get size(): number {
    return Object.keys(this.items).length
  }

  set(key: K, value: V): void {
    this.items[key] = value
  }

  get(key: K): V {
    return this.items[key]
  }

  has(key: K): boolean {
    return this.items[key] != null
  }

  delete(key: K): boolean {
    if (this.has(key)) {
      delete this.items[key]
      return true
    }

    return false
  }

  clear(): void {
    this.items = {} as Record<K, V>
  }
}