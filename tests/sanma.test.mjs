import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import * as esm from "../release/node/mahjong_seatings_rs_node.mjs";
const require = createRequire(import.meta.url);
const cjs = require("../release/node/mahjong_seatings_rs_node.js");

for (const [name, api] of [["ESM", esm], ["CommonJS", cjs]]) {
  test(`${name}: three-player seating and wind placement`, () => {
    const playersMap = Array.from({ length: 9 }, (_, i) => [i + 1, 1500]);
    const previousSeatings = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const input = { playersMap, previousSeatings, groupsCount: 1, randFactor: 123456, windShuffle: "balanced", tableSize: 3 };
    const result = api.make_seating_shuffled(input);
    assert.deepEqual(result.map(([id]) => id).sort((a, b) => a - b), playersMap.map(([id]) => id));
    assert.deepEqual(api.make_seating_shuffled(input), result);
    const winds = api.update_wind_placing_only({ ...input, windShuffle: "prescripted" });
    assert.deepEqual(winds, playersMap);
  });

  test(`${name}: omitted table size retains four-player behavior`, () => {
    const input = { playersMap: [[1, 0], [2, 0], [3, 0], [4, 0]], previousSeatings: [], groupsCount: 1, randFactor: 123, windShuffle: "balanced" };
    assert.deepEqual(api.make_seating_shuffled(input), api.make_seating_shuffled({ ...input, tableSize: 4 }));
  });

  test(`${name}: invalid tables throw instead of returning undefined`, () => {
    const input = { playersMap: [[1, 0], [2, 0], [3, 0]], previousSeatings: [], groupsCount: 1, randFactor: 123, windShuffle: "random", tableSize: 3 };
    assert.throws(() => api.make_seating_shuffled({ ...input, tableSize: 2 }));
    assert.throws(() => api.make_seating_shuffled({ ...input, groupsCount: 0 }));
    assert.throws(() => api.make_seating_shuffled({ ...input, previousSeatings: [[1, 2, 3, 4]] }));
    assert.throws(() => api.update_wind_placing_only({ ...input, playersMap: [[1, 0], [2, 0]] }));
  });
  test(`${name}: interval grouping uses three seats and retains fallback tables`, () => {
    const playersMap = Array.from({ length: 12 }, (_, i) => [i + 1, 1000 - i]);
    const input = { playersMap, previousSeatings: [], step: 3, randFactor: 123, windShuffle: "prescripted", tableSize: 3 };
    const result = api.make_seating_interval(input);
    assert.deepEqual(result.map(([id]) => id), [1, 4, 7, 2, 5, 8, 3, 6, 9, 10, 11, 12]);
    assert.throws(() => api.make_seating_interval({ ...input, step: 0 }));
    assert.throws(() => api.make_seating_interval({ ...input, tableSize: 2 }));
    assert.throws(() => api.make_seating_interval({ ...input, previousSeatings: [[1, 2, 3, 4]] }));
  });

  test(`${name}: Swiss seating uses complete three-player tables and avoids repeats`, () => {
    const playersMap = Array.from({ length: 9 }, (_, i) => [i + 1, 1000 - i]);
    const previousSeatings = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const input = { playersMap, previousSeatings, randFactor: 123, windShuffle: "balanced", tableSize: 3 };
    const result = api.make_seating_swiss(input);
    assert.deepEqual(result.map(([id]) => id).sort((a, b) => a - b), playersMap.map(([id]) => id));
    for (let i = 0; i < result.length; i += 3) {
      const table = result.slice(i, i + 3).map(([id]) => id);
      for (const previous of previousSeatings) {
        assert.ok(table.filter((id) => previous.includes(id)).length <= 1);
      }
    }
    assert.deepEqual(api.make_seating_swiss(input), result);
    assert.throws(() => api.make_seating_swiss({ ...input, tableSize: 2 }));
    assert.throws(() => api.make_seating_swiss({ ...input, playersMap: playersMap.slice(1) }));
    assert.throws(() => api.make_seating_swiss({ ...input, previousSeatings: [[1, 2, 3, 4]] }));
  });

  test(`${name}: interval and Swiss default to four-player tables`, () => {
    const input = { playersMap: Array.from({ length: 8 }, (_, i) => [i + 1, 1000 - i]), previousSeatings: [], step: 1, randFactor: 123, windShuffle: "balanced" };
    for (const method of ["make_seating_interval", "make_seating_swiss"]) {
      assert.deepEqual(api[method](input), api[method]({ ...input, tableSize: 4 }));
    }
  });

}
