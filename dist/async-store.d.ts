export declare const AsyncStore: <T extends {}>(storeName: string) => {
    get: <R>(key: keyof T) => Promise<R>;
    set: (key: string, value: any) => Promise<void>;
    value: () => Promise<{}>;
    clear: () => Promise<void>;
};
