## Mahjong-seatings-rs-bundlers

Small wrapper around [mahjong-seatings-rust](https://github.com/MahjongPantheon/mahjong-seatings-rust) to compile it to 
wasm, bundlers version.

## Usage

- Install package: `npm install mahjong-seatings-rs-bundlers`
- Setup your webpack or other bundler to use wasm files
    - For webpack, add the following to webpack config:
    - ` experiments: { asyncWebAssembly: true } `
- Invoke function as follows:

```typescript
import {make_seating_shuffled, make_seating_interval, make_seating_swiss} from "mahjong-seatings-rs-bundlers";

console.log('Shuffled seating', make_seating_shuffled({
  playersMap: {
    '1': 1500,
    '2': 1500,
    '3': 1500,
    '4': 1500,
    '5': 1500,
    '6': 1500,
    '7': 1500,
    '8': 1500,
  },
  previousSeatings: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],
  groupsCount: 1,
  randFactor: 1234455,
}));

console.log('Interval seating', make_seating_interval({
  playersMap: {
    '1': 1510,
    '2': 1508,
    '3': 1506,
    '4': 1504,
    '5': 1496,
    '6': 1494,
    '7': 1492,
    '8': 1490,
  },
  step: 2,
  randFactor: 1234455,
}));

console.log('Swiss seating', make_seating_swiss({
  playersMap: {
    '1': 1510,
    '2': 1508,
    '3': 1506,
    '4': 1504,
    '5': 1496,
    '6': 1494,
    '7': 1492,
    '8': 1490,
  },
  previousSeatings: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],
  randFactor: 1234455,
}));
```

Note that returned lists contain player ids and their rating. First four elements are first table, next four are second table, etc.