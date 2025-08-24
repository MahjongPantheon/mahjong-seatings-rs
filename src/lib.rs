#![forbid(unsafe_code)]

use mahjong_seatings_rust::{make_interval_seating, make_shuffled_seating, make_swiss_seating, PlayersMap};
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::{from_value, to_value};
use wasm_bindgen::prelude::*;

#[derive(Deserialize)]
pub struct IntervalSeatingInput {
    pub players_map: PlayersMap,
    pub step: usize,
    pub rand_factor: u64,
}

#[derive(Deserialize)]
pub struct ShuffledSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub groups_count: u32,
    pub rand_factor: u64,
}

#[derive(Deserialize)]
pub struct SwissSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub rand_factor: u64,
}

#[derive(Serialize)]
pub struct SeatingsCalcResult {
    pub result: PlayersMap,
}

#[wasm_bindgen]
pub fn make_seating_shuffled(val: JsValue) -> JsValue {
    let i: Result<ShuffledSeatingInput, serde_wasm_bindgen::Error> = from_value(val);

    match i {
        Ok(i) => {
            let result = SeatingsCalcResult {
                result: make_shuffled_seating(&i.players_map, &i.previous_seatings, i.groups_count, i.rand_factor)
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
                result: make_interval_seating(&i.players_map, i.step, i.rand_factor)
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
                result: make_swiss_seating(&i.players_map, &i.previous_seatings, i.rand_factor)
            };
            to_value(&result).unwrap()
        }
        Err(e) => to_value(&e.to_string()).unwrap(),
    }
}
