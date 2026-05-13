#![forbid(unsafe_code)]
extern crate web_sys;
use mahjong_seatings_rust::{
    make_interval_seating, make_shuffled_seating, make_swiss_seating, PlayersMap, WindShuffle,
};
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::{from_value, to_value};
use wasm_bindgen::prelude::*;

#[derive(Deserialize)]
pub struct IntervalSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub step: usize,
    pub rand_factor: u64,
    pub wind_shuffle: u8,
}

#[derive(Deserialize)]
pub struct ShuffledSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub groups_count: u32,
    pub rand_factor: u64,
    pub wind_shuffle: u8,
}

#[derive(Deserialize)]
pub struct SwissSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub rand_factor: u64,
    pub wind_shuffle: u8,
}

#[derive(Serialize)]
pub struct SeatingsCalcResult {
    pub result: PlayersMap,
}

fn input_to_wind_shuffle(wind_shuffle: u8) -> WindShuffle {
    match wind_shuffle {
        0 => WindShuffle::Random,
        1 => WindShuffle::Balanced,
        2 => WindShuffle::Prescripted,
        _ => WindShuffle::Random,
    }
}

#[wasm_bindgen]
pub fn make_seating_shuffled(val: JsValue) -> JsValue {
    let i: Result<ShuffledSeatingInput, serde_wasm_bindgen::Error> = from_value(val);

    match i {
        Ok(i) => {
            let result = SeatingsCalcResult {
                result: make_shuffled_seating(
                    &i.players_map,
                    &i.previous_seatings,
                    i.groups_count,
                    i.rand_factor,
                    input_to_wind_shuffle(i.wind_shuffle),
                ),
            };

            to_value(&result).unwrap()
        }
        Err(e) => to_value(&e.to_string()).unwrap(),
    }
}

#[wasm_bindgen]
pub fn make_seating_interval(val: JsValue) -> JsValue {
    let i: Result<IntervalSeatingInput, serde_wasm_bindgen::Error> = from_value(val);

    match i {
        Ok(i) => {
            let result = SeatingsCalcResult {
                result: make_interval_seating(
                    &i.players_map,
                    &i.previous_seatings,
                    i.step,
                    i.rand_factor,
                    input_to_wind_shuffle(i.wind_shuffle),
                ),
            };
            to_value(&result).unwrap()
        }
        Err(e) => to_value(&e.to_string()).unwrap(),
    }
}

#[wasm_bindgen]
pub fn make_seating_swiss(val: JsValue) -> JsValue {
    let i: Result<SwissSeatingInput, serde_wasm_bindgen::Error> = from_value(val);

    match i {
        Ok(i) => {
            let result = SeatingsCalcResult {
                result: make_swiss_seating(
                    &i.players_map,
                    &i.previous_seatings,
                    i.rand_factor,
                    input_to_wind_shuffle(i.wind_shuffle),
                ),
            };
            to_value(&result).unwrap()
        }
        Err(e) => to_value(&e.to_string()).unwrap(),
    }
}
