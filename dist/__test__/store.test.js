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
const assert = require("assert");
const async_store_1 = require("../async-store");
const rimraf = require("rimraf");
const utils = require("electron-json-storage/lib/utils");
describe("store", () => {
    beforeEach((done) => {
        const dataPath = utils.getUserDataPath();
        rimraf(dataPath, done);
    });
    it("Works", () => __awaiter(this, void 0, void 0, function* () {
        const me = {};
        const store = async_store_1.AsyncStore("me");
        yield store.set("xName", "me");
        yield store.set("ok", true);
        const xName = yield store.get("xName");
        assert.equal(xName, "me");
        Object.assign(me, yield store.value());
        assert.deepEqual(me, { xName: "me", ok: true });
    }));
});
//# sourceMappingURL=store.test.js.map