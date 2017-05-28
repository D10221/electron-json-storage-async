"use strict";
/*
 * The MIT License
 *
 * Copyright (c) 2016 Juan Cruz Viotti. https://github.com/jviotti
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Partial
  original spec: https://github.com/jviotti/electron-json-storage/blob/master/tests/storage.spec.js
  TODO: complete
*/
const async_storage_1 = require("../async-storage");
const assert = require("assert");
const utils = require("electron-json-storage/lib/utils");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const util = require("util");
const fs = require("fs");
describe("Electron JSON Storage async", () => {
    // Ensure each test case is always ran in a clean state
    beforeEach(async_storage_1.asyncStorage.clear);
    it("should yield an error if no key", () => __awaiter(this, void 0, void 0, function* () {
        const message = (yield async_storage_1.asyncStorage.get(null).then(() => null).catch(e => e.message));
        assert.equal(message, 
        /* expected */ "Missing key");
    }));
    it("should yield an error if key is not a string", () => __awaiter(this, void 0, void 0, function* () {
        const message = (yield async_storage_1.asyncStorage.get(1).then(() => null).catch(e => e.message));
        assert.equal(message, 
        /* expected */ "Invalid key");
    }));
    it("should yield an error if key is a blank string", () => __awaiter(this, void 0, void 0, function* () {
        const message = (yield async_storage_1.asyncStorage.get("   ").then(() => null).catch(e => e.message));
        assert.equal(message, 
        /* expected */ "Invalid key");
    }));
});
describe("given the user data path does not exist", () => {
    beforeEach((done) => {
        rimraf(utils.getUserDataPath(), done);
    });
    afterEach((done) => {
        mkdirp(utils.getUserDataPath(), done);
    });
    it("should return an empty object for any key", () => __awaiter(this, void 0, void 0, function* () {
        const x = yield async_storage_1.asyncStorage.get("foobarbaz")
            .then(data => ({ data, error: null }))
            .catch(error => ({ data: {}, error }));
        assert.ok(util.isNullOrUndefined(x.error));
        assert.ok(util.isObject(x.data));
    }));
});
describe("given stored settings", () => {
    beforeEach(() => {
        return async_storage_1.asyncStorage.set("foo", { data: "hello" });
    });
    it("should yield the data", () => __awaiter(this, void 0, void 0, function* () {
        const x = yield async_storage_1.asyncStorage.get("foo")
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(x.error));
        assert.equal(x.result.data, "hello");
    }));
    it("should yield the data if explicitly passing the extension", () => __awaiter(this, void 0, void 0, function* () {
        const x = yield async_storage_1.asyncStorage.get("foo")
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(x.error));
        assert.equal(x.result.data, "hello");
    }));
    it("should yield an empty object given an incorrect key", () => __awaiter(this, void 0, void 0, function* () {
        const x = yield async_storage_1.asyncStorage.get("foox")
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(x.error));
        assert.deepEqual(x.result, {});
    }));
});
describe("given invalid stored JSON", () => {
    beforeEach((done) => {
        const fileName = utils.getFileName("foo");
        // Using fs directly since storage.set()
        // contains logic to prevent invalid JSON
        // from being written at all
        return fs.writeFile(fileName, "Foo{bar}123", done);
    });
    it("should yield an error", () => __awaiter(this, void 0, void 0, function* () {
        const x = yield async_storage_1.asyncStorage.get("foo")
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(!util.isNullOrUndefined(x.error));
        assert.ok(util.isError(x.error));
        assert.ok(util.isNullOrUndefined(x.result));
    }));
});
describe("given a non-existent user data path", () => {
    beforeEach(() => {
        return Promise.all([
            async_storage_1.asyncStorage.set("foo", { name: "foo" }),
            async_storage_1.asyncStorage.set("bar", { name: "bar" }),
            async_storage_1.asyncStorage.set("baz", { name: "baz" }),
        ]);
    });
    it("should return an empty object if no passed keys", () => __awaiter(this, void 0, void 0, function* () {
        const many = yield async_storage_1.asyncStorage.getMany([])
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(many.error));
        assert.deepEqual(many.result, {});
    }));
    it("should read the passed keys", () => __awaiter(this, void 0, void 0, function* () {
        const many = yield async_storage_1.asyncStorage.getMany(["foo", "baz"])
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(many.error));
        assert.deepEqual(many.result, {
            foo: { name: "foo" },
            baz: { name: "baz" }
        });
    }));
    it("should be able to read a single key", () => __awaiter(this, void 0, void 0, function* () {
        const many = yield async_storage_1.asyncStorage.getMany(["foo",])
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(many.error));
        assert.deepEqual(many.result, {
            foo: { name: "foo" },
        });
    }));
    it("should return empty objects for missing keys", () => __awaiter(this, void 0, void 0, function* () {
        const many = yield async_storage_1.asyncStorage.getMany(["foo", "xyz"])
            .then(result => ({ result, error: null }))
            .catch(error => ({ result: null, error }));
        assert.ok(util.isNullOrUndefined(many.error));
        assert.deepEqual(many.result, {
            foo: { name: "foo" },
            xyz: {}
        });
    }));
});
//# sourceMappingURL=async-storage.test.js.map