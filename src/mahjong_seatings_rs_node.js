const orig = require("./mahjong_seatings_rs.js");

function _toWindShuffle(val) {
  switch (val) {
    case "random":
      return 0;
    case "balanced":
      return 1;
    case "prescripted":
      return 2;
    default:
      return 0;
  }
}

module.exports = {
  make_seating_shuffled: function (val) {
    const input = {
      players_map: Object.entries(val.playersMap).map(([k, v]) => [
        parseInt(k.toString(), 10),
        v,
      ]),
      previous_seatings: val.previousSeatings,
      groups_count: val.groupsCount,
      rand_factor: val.randFactor,
      wind_shuffle: _toWindShuffle(val.windShuffle),
    };
    return orig.make_seating_shuffled(input).result;
  },

  make_seating_interval: function (val) {
    const input = {
      players_map: Object.entries(val.playersMap).map(([k, v]) => [
        parseInt(k.toString(), 10),
        v,
      ]),
      previous_seatings: val.previousSeatings,
      step: val.step,
      rand_factor: val.randFactor,
      wind_shuffle: _toWindShuffle(val.windShuffle),
    };
    return orig.make_seating_interval(input).result;
  },

  make_seating_swiss: function (val) {
    const input = {
      players_map: Object.entries(val.playersMap).map(([k, v]) => [
        parseInt(k.toString(), 10),
        v,
      ]),
      previous_seatings: val.previousSeatings,
      rand_factor: val.randFactor,
      wind_shuffle: _toWindShuffle(val.windShuffle),
    };
    return orig.make_seating_swiss(input).result;
  },

  update_wind_placing_only: function (val) {
    const input = {
      players_map: Object.entries(val.playersMap).map(([k, v]) => [
        parseInt(k.toString(), 10),
        v,
      ]),
      previous_seatings: val.previousSeatings,
      rand_factor: val.randFactor,
      wind_shuffle: _toWindShuffle(val.windShuffle),
    };
    return orig.update_wind_placing_only(input).result;
  },
};
