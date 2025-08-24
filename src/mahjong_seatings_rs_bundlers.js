import * as orig from './mahjong_seatings_rs.js';

export function make_seating_shuffled(val) {
    const input = {
        players_map: Object.entries(val.playersMap).map(([k, v]) => [parseInt(k.toString(), 10), v]),
        previous_seatings: val.previousSeatings,
        groups_count: val.groupsCount,
        rand_factor: val.randFactor,
    };
    return orig.make_seating_shuffled(input).result;
}

export function make_seating_interval(val) {
    const input = {
        players_map: Object.entries(val.playersMap).map(([k, v]) => [parseInt(k.toString(), 10), v]),
        step: val.step,
        rand_factor: val.randFactor,
    };
    return orig.make_seating_interval(input).result;
}

export function make_seating_swiss(val) {
    const input = {
        players_map: Object.entries(val.playersMap).map(([k, v]) => [parseInt(k.toString(), 10), v]),
        previous_seatings: val.previousSeatings,
        rand_factor: val.randFactor,
    };
    return orig.make_seating_swiss(input).result;
}
