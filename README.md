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
