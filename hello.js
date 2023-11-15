"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tonal_1 = require("tonal");
const tonal_2 = require("tonal");
console.log(tonal_1.Note.get("C"));
console.log(tonal_2.Interval.distance("C4", "G4"));
console.log(tonal_2.Interval.distance("G4", "C4"));
console.log(tonal_2.Interval.semitones(tonal_2.Interval.distance("G4", "C4")));
