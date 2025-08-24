const orig = require('./mahjong_seatings_rs.js');

module.exports = {
    make_seating_shuffled: function (val) {
        const input = {
            players_map: Object.entries(val.playersMap).map(([k, v]) => [parseInt(k.toString(), 10), v]),
            previous_seatings: val.previousSeatings,
            groups_count: val.groupsCount,
            rand_factor: val.randFactor,
        };
        return orig.make_seating_shuffled(input).result;
    },

    make_seating_interval: function (val) {
        const input = {
            players_map: Object.entries(val.playersMap).map(([k, v]) => [parseInt(k.toString(), 10), v]),
            step: val.step,
            rand_factor: val.randFactor,
        };
        return orig.make_seating_interval(input).result;
    },

    make_seating_swiss: function (val) {
        const input = {
            players_map: Object.entries(val.playersMap).map(([k, v]) => [parseInt(k.toString(), 10), v]),
            previous_seatings: val.previousSeatings,
            rand_factor: val.randFactor,
        };
        return orig.make_seating_swiss(input).result;
    }
}