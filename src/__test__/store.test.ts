import * as assert from "assert";
import { AsyncStore } from "../async-store";
import * as rimraf from "rimraf";
const utils = require("electron-json-storage/lib/utils");

interface Me {
    xName?: string;
    ok?: boolean;
}

describe("store", () => {
    beforeEach((done) => {
        const dataPath = utils.getUserDataPath();
        rimraf(dataPath, done);
    });

    it("Works", async () => {
        const me: Me = {};
        const store = AsyncStore<Me>("me");
        await store.set("xName", "me");
        await store.set("ok", true);
        const xName = await store.get("xName");
        assert.equal(xName, "me");
        Object.assign(me, await store.value());
        assert.deepEqual(me, { xName: "me", ok: true });
    });
});