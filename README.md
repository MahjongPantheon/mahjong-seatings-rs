## Mahjong-seatings-rs

Small wrapper around [mahjong-seatings-rust](https://github.com/MahjongPantheon/mahjong-seatings-rust) to compile it to wasm.

Built packages are deployed to NPM as:
- [Package for bundlers (webpack, etc)](https://www.npmjs.com/package/mahjong-seatings-rs-bundlers)
- [Package for node](https://www.npmjs.com/package/mahjong-seatings-rs-node)

## Compilation

Make sure you have wasm-pack installed in PATH.

Run `./build.sh` and check `release` folder for ready packages for node and bundlers.

## Demos

- Simple webpack-based demo for bundler version is provided in `demo` folder.

## Three-player tables

`make_seating_shuffled`, `make_seating_interval`, `make_seating_swiss`, and
`update_wind_placing_only` accept optional `tableSize: 3 | 4` (default `4`). Pass only real players; every previous table
must contain exactly that many IDs. Random and balanced wind placement preserve
table membership. Prescripted placement preserves seat order. Interval seating
keeps the same rating/step grouping and fallback for remaining tables. Swiss
seating keeps its recursive rating-prioritized search and repeated-opponent limits,
with three seats per table.

Release the updated Rust engine first, then update this repository's engine
Git dependency/lockfile and publish both npm packages. Pantheon can then update
its npm dependency and lockfile and run the deferred integration checks.

After rebuilding, run `node --test tests/*.test.mjs` to check the Node ESM and CommonJS wrappers.
