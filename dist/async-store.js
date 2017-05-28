"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as util from "util";
const async_storage_1 = require("./async-storage");
// import * as createDebug from "debug";
// const debug = createDebug(require("../package.json").name + ":" + "async-storage");
// const logError = (e: Error) => {
//     debug(e);
// };
const _get = (storeName, initialize) => (key) => __awaiter(this, void 0, void 0, function* () {
    const store = yield initialize();
    return async_storage_1.asyncStorage.get(storeName)
        .then(state => {
        store[key] = state[key];
        return store[key];
    });
});
const _set = (storeName, initialize) => (key, value) => __awaiter(this, void 0, void 0, function* () {
    const store = yield initialize();
    store[key] = value;
    return async_storage_1.asyncStorage.set(storeName, store);
});
const _value = (initialize) => () => __awaiter(this, void 0, void 0, function* () {
    const store = yield initialize();
    return store;
});
exports.AsyncStore = (storeName) => {
    let store = null;
    const initialize = () => __awaiter(this, void 0, void 0, function* () {
        if (store) {
            return store;
        }
        store = yield async_storage_1.asyncStorage.get(storeName);
        return store;
    });
    return {
        get: _get(storeName, initialize),
        set: _set(storeName, initialize),
        value: _value(initialize),
        clear: () => {
            store = {};
            return async_storage_1.asyncStorage.set(storeName, store);
        }
    };
};
//# sourceMappingURL=async-store.js.map