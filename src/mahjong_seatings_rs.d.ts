export type PlayersMap = Record<string | number, number>;
export type Seating = Array<[number, number]>;
export const enum WindShuffle {
  Random = 0,
  Balanced = 1,
  Prescripted = 2,
}

export type ShuffledSeatingInput = {
  playersMap: PlayersMap;
  previousSeatings: number[][];
  groupsCount: number;
  randFactor: number;
  windShuffle: WindShuffle;
};

export type IntervalSeatingInput = {
  playersMap: PlayersMap;
  previousSeatings: number[][];
  step: number;
  randFactor: number;
  windShuffle: WindShuffle;
};

export type SwissSeatingInput = {
  playersMap: PlayersMap;
  previousSeatings: number[][];
  randFactor: number;
  windShuffle: WindShuffle;
};

export function make_seating_shuffled(val: ShuffledSeatingInput): Seating;
export function make_seating_interval(val: IntervalSeatingInput): Seating;
export function make_seating_swiss(val: SwissSeatingInput): Seating;
