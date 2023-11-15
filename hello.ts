import {Note} from "tonal"
import { Interval } from "tonal"
console.log(Note.get("C"))
console.log(Interval.distance("C4", "G4"))
console.log(Interval.distance("G4", "C4")); // 符号付き音程が取れる
console.log(Interval.semitones(Interval.distance("G4", "C4"))); // 符号付き音程クロマも取れる