export type PlayersMap = Record<string | number, number>;
export type Seating = Array<[number, number]>;

export type ShuffledSeatingInput = {
    playersMap: PlayersMap,
    previousSeatings: number[][],
    groupsCount: number,
    randFactor: number,
}

export type IntervalSeatingInput = {
    playersMap: PlayersMap,
    step: number,
    randFactor: number,
}

export type SwissSeatingInput = {
    playersMap: PlayersMap,
    previousSeatings: number[][],
    randFactor: number,
}


export function make_seating_shuffled(val: ShuffledSeatingInput): Seating;
export function make_seating_interval(val: IntervalSeatingInput): Seating;
export function make_seating_swiss(val: SwissSeatingInput): Seating;
