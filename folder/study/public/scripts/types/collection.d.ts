export declare class CollectionNew<V, K extends number | string | symbol = string> {
    items: Partial<Record<K, V>>;
    get size(): number;
    set(key: K, value: V): void;
    get(key: K): V;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
}