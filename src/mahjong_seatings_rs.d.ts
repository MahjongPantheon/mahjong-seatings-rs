export type PlayersMap = Array<[string | number, number]>;
export type Seating = Array<[number, number]>;
export type WindShuffle = "random" | "balanced" | "prescripted";

export type ShuffledSeatingInput = {
  /** Number of real players per table. Defaults to 4. */
  tableSize?: 3 | 4;
  playersMap: PlayersMap;
  previousSeatings: number[][];
  groupsCount: number;
  randFactor: number;
  windShuffle: WindShuffle;
};

export type IntervalSeatingInput = {
  /** Number of real players per table. Defaults to 4. */
  tableSize?: 3 | 4;
  playersMap: PlayersMap;
  previousSeatings: number[][];
  step: number;
  randFactor: number;
  windShuffle: WindShuffle;
};

export type SwissSeatingInput = {
  /** Number of real players per table. Defaults to 4. */
  tableSize?: 3 | 4;
  playersMap: PlayersMap;
  previousSeatings: number[][];
  randFactor: number;
  windShuffle: WindShuffle;
};

export type UpdateWindPlacingInput = {
  /** Number of real players per table. Defaults to 4. */
  tableSize?: 3 | 4;
  playersMap: PlayersMap;
  previousSeatings: number[][];
  randFactor: number;
  windShuffle: WindShuffle;
};

export function make_seating_shuffled(val: ShuffledSeatingInput): Seating;
export function make_seating_interval(val: IntervalSeatingInput): Seating;
export function make_seating_swiss(val: SwissSeatingInput): Seating;
export function update_wind_placing_only(val: UpdateWindPlacingInput): Seating;
