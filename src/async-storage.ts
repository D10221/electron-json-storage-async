import * as storage from "electron-json-storage";
import { AsyncStorage } from "./interfaces";

const get = <T extends {}>(key: string) => new Promise<T>((resolve, reject) => {
    storage
        .get(key, (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data as T);
        });
});

const set = <T extends {}>(key: string, data: T) => new Promise<void>((resolve, reject) => {
    storage
        .set(key, data || {}, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
});

const has = (x: string) => new Promise<boolean>((resolve, reject) => {
    storage.has(x, (e, value) => {
        if (e) {
            reject(e);
            return;
        }
        resolve(value);
    });
});

const keys = () => new Promise<string[]>((resolve, reject) => {
    storage.keys((e, value) => {
        if (e) { reject(e); return; }
        resolve(value);
    });
});

const remove = (x: string) => new Promise<void>((resolve, reject) => {
    storage.remove(x, (e) => {
        if (e) {
            reject(e);
            return;
        }
        resolve();
    });
});

const clear = () => new Promise<void>((resolve, reject) => {
    storage.clear(e => {
        if (e) {
            reject(e);
            return;
        }
        resolve();
    });
});

const getMany = (key: string[]) => new Promise<any[]>((resolve, reject) => {
    (storage as any)
        .getMany(key, (error: Error, data: any[]) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        });
});

export const asyncStorage: AsyncStorage = {
    get, set, has, keys, remove, clear, getMany
};