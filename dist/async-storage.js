"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage = require("electron-json-storage");
const get = (key) => new Promise((resolve, reject) => {
    storage
        .get(key, (error, data) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(data);
    });
});
const set = (key, data) => new Promise((resolve, reject) => {
    storage
        .set(key, data || {}, (error) => {
        if (error) {
            reject(error);
            return;
        }
        resolve();
    });
});
const has = (x) => new Promise((resolve, reject) => {
    storage.has(x, (e, value) => {
        if (e) {
            reject(e);
            return;
        }
        resolve(value);
    });
});
const keys = () => new Promise((resolve, reject) => {
    storage.keys((e, value) => {
        if (e) {
            reject(e);
            return;
        }
        resolve(value);
    });
});
const remove = (x) => new Promise((resolve, reject) => {
    storage.remove(x, (e) => {
        if (e) {
            reject(e);
            return;
        }
        resolve();
    });
});
const clear = () => new Promise((resolve, reject) => {
    storage.clear(e => {
        if (e) {
            reject(e);
            return;
        }
        resolve();
    });
});
const getMany = (key) => new Promise((resolve, reject) => {
    storage
        .getMany(key, (error, data) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(data);
    });
});
exports.asyncStorage = {
    get, set, has, keys, remove, clear, getMany
};
//# sourceMappingURL=async-storage.js.map