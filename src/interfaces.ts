export interface AsyncStorage {
    get<T extends {}>(key: string): Promise<T>;
    set<T extends {}>(key: string, json: T): Promise<void>;
    has(key: string): Promise<boolean>;
    keys(): Promise<string[]>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;

    getMany(keys: string[]): Promise<any & {}>;
}