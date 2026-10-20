#![forbid(unsafe_code)]
extern crate web_sys;
use mahjong_seatings_rust::{
    make_interval_seating_with_table_size, make_shuffled_seating_with_table_size,
    make_swiss_seating_with_table_size, update_wind_placing_with_table_size, PlayersMap,
    WindShuffle,
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
    #[serde(default = "default_table_size")]
    pub table_size: usize,
}

#[derive(Deserialize)]
pub struct ShuffledSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub groups_count: u32,
    pub rand_factor: u64,
    pub wind_shuffle: u8,
    #[serde(default = "default_table_size")]
    pub table_size: usize,
}

#[derive(Deserialize)]
pub struct SwissSeatingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub rand_factor: u64,
    pub wind_shuffle: u8,
    #[serde(default = "default_table_size")]
    pub table_size: usize,
}

#[derive(Deserialize)]
pub struct UpdateWindPlacingInput {
    pub players_map: PlayersMap,
    pub previous_seatings: Vec<Vec<u32>>,
    pub rand_factor: u64,
    pub wind_shuffle: u8,
    #[serde(default = "default_table_size")]
    pub table_size: usize,
}

#[derive(Serialize)]
pub struct SeatingsCalcResult {
    pub result: PlayersMap,
}

fn default_table_size() -> usize {
    4
}

fn validate_tables(
    players: &PlayersMap,
    previous: &[Vec<u32>],
    table_size: usize,
) -> Result<(), JsValue> {
    if table_size != 3 && table_size != 4 {
        return Err(JsValue::from_str("Table size must be 3 or 4"));
    }
    if players.len() % table_size != 0 || previous.iter().any(|table| table.len() != table_size) {
        return Err(JsValue::from_str(
            "Incomplete table or mismatched previous table size",
        ));
    }
    let ids: std::collections::HashSet<_> = players.iter().map(|&(id, _)| id).collect();
    if ids.len() != players.len() || ids.contains(&0) {
        return Err(JsValue::from_str("Players must have distinct positive IDs"));
    }
    Ok(())
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
pub fn make_seating_shuffled(val: JsValue) -> Result<JsValue, JsValue> {
    let i: ShuffledSeatingInput = from_value(val).map_err(|e| JsValue::from_str(&e.to_string()))?;
    validate_tables(&i.players_map, &i.previous_seatings, i.table_size)?;
    if i.groups_count == 0 {
        return Err(JsValue::from_str("Groups count must be positive"));
    }
    let result = SeatingsCalcResult {
        result: make_shuffled_seating_with_table_size(
            &i.players_map,
            &i.previous_seatings,
            i.groups_count,
            i.rand_factor,
            input_to_wind_shuffle(i.wind_shuffle),
            i.table_size,
        ),
    };
    to_value(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn make_seating_interval(val: JsValue) -> Result<JsValue, JsValue> {
    let i: IntervalSeatingInput = from_value(val).map_err(|e| JsValue::from_str(&e.to_string()))?;
    validate_tables(&i.players_map, &i.previous_seatings, i.table_size)?;
    if i.step == 0 {
        return Err(JsValue::from_str("Interval step must be positive"));
    }
    let result = SeatingsCalcResult {
        result: make_interval_seating_with_table_size(
            &i.players_map,
            &i.previous_seatings,
            i.step,
            i.rand_factor,
            input_to_wind_shuffle(i.wind_shuffle),
            i.table_size,
        ),
    };
    to_value(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn make_seating_swiss(val: JsValue) -> Result<JsValue, JsValue> {
    let i: SwissSeatingInput = from_value(val).map_err(|e| JsValue::from_str(&e.to_string()))?;
    validate_tables(&i.players_map, &i.previous_seatings, i.table_size)?;
    let result = SeatingsCalcResult {
        result: make_swiss_seating_with_table_size(
            &i.players_map,
            &i.previous_seatings,
            i.rand_factor,
            input_to_wind_shuffle(i.wind_shuffle),
            i.table_size,
        ),
    };
    to_value(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen]
pub fn update_wind_placing_only(val: JsValue) -> Result<JsValue, JsValue> {
    let i: UpdateWindPlacingInput =
        from_value(val).map_err(|e| JsValue::from_str(&e.to_string()))?;
    validate_tables(&i.players_map, &i.previous_seatings, i.table_size)?;
    let result = SeatingsCalcResult {
        result: update_wind_placing_with_table_size(
            input_to_wind_shuffle(i.wind_shuffle),
            &i.players_map,
            &i.previous_seatings,
            i.rand_factor,
            i.table_size,
        ),
    };
    to_value(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}
