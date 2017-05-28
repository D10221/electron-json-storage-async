// import * as util from "util";
import { asyncStorage } from "./async-storage";

// import * as createDebug from "debug";
// const debug = createDebug(require("../package.json").name + ":" + "async-storage");
// const logError = (e: Error) => {
//     debug(e);
// };

const _get = <T extends {}>(storeName: string, initialize: InitialState) =>
    async <R>(key: keyof T): Promise<R> => {
        const store = await initialize();
        return asyncStorage.get<T>(storeName)
            .then(state => {
                store[key] = state[key];
                return store[key];
            });
    };
type InitialState = <T>() => Promise<any & T>;

const _set = <T extends {}>(storeName: string, initialize: InitialState) => async (key: keyof T, value: T) => {
    const store = await initialize();
    store[key] = value;
    return asyncStorage.set(storeName, store);
};

const _value = <T extends {}>(initialize: InitialState) =>
    async (): Promise<T> => {
        const store = await initialize();
        return store;
    };


export const AsyncStore = <T extends {}>(storeName: string) => {

    let store: any = null;
    const initialize = async () => {
        if (store) { return store; }
        store = await asyncStorage.get(storeName);
        return store;
    };

    return {
        get: _get<T>(storeName, initialize),
        set: _set<T>(storeName, initialize),
        value: _value(initialize),
        clear: () => {
            store = {};
            return asyncStorage.set(storeName, store);
        }
    };
};
