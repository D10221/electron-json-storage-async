export declare const AsyncStore: <T extends {}>(storeName: string) => {
    get: <R>(key: keyof T) => Promise<R>;
    set: (key: keyof T, value: T) => Promise<void>;
    value: () => Promise<{}>;
    clear: () => Promise<void>;
};
