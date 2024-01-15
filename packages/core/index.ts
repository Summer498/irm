import { Interval } from "tonal";
import { ParametricScale } from "./src/ParametricScale";
import {
  NULL_REGISTRAL_RETURN_FORM,
  RegistralReturnForm,
} from "./src/RegistralReturnForm";
import { mL } from "./src/Direction";
import { AB } from "./src/Pattern";

// console.log(Note.get("C"));
// console.log(Interval.distance("C4", "G4"));
// console.log(Interval.distance("G4", "C4")); // 符号付き音程が取れる
// console.log(Interval.semitones(Interval.distance("G4", "C4"))); // 符号付き音程クロマも取れる

// テスト用
// const octave = ["Cb","C","C#","Db","D","D#","Eb","E","E#","Fb","F","F#","Gb","G","G#","Ab","A","A#","Bb","B","B#",];

type NoteLiteral = string; // TODO: import form tonal / define by myself
// type IntervalLiteral = string;  // TODO: import from tonal / define by myself
// type TNote = ReturnType<typeof Note.get>;
type TInterval = ReturnType<typeof Interval.get>;
type ArchetypeSymbol =
  | "P"
  | "IP"
  | "VP"
  | "R"
  | "IR"
  | "VR"
  | "D"
  | "ID"
  | "M"
  | "dyad";

class Archetype {
  symbol: ArchetypeSymbol;
  retrospective: boolean;
  intervallic_closure: number;
  registral_closure: number;
  registral_return_form: RegistralReturnForm;
  notes: NoteLiteral[];
  intervals: TInterval[];

  constructor(notes: string[]) {
    this.notes = notes;
    const notes_num = notes.length;
    if (notes_num !== 3) {
      this.retrospective = false;
      this.intervallic_closure = 0;
      this.registral_closure = 0;
      this.registral_return_form = NULL_REGISTRAL_RETURN_FORM;
      this.intervals = [Interval.get(""), Interval.get("")];
      if (notes_num === 1) this.symbol = "M";
      else if (notes_num === 2) this.symbol = "dyad";
      else
        throw new Error(
          `Invalid length of notes. Required 1, 2, or, 3 notes but given was ${notes.length} notes: ${notes}`,
        );
    } else {
      this.intervals = [
        Interval.get(Interval.distance(notes[0], notes[1])),
        Interval.get(Interval.distance(notes[1], notes[2])),
      ];
      const parametric_scale = new ParametricScale(
        this.intervals[0],
        this.intervals[1],
      );
      const idir = parametric_scale.intervallic_scale_direction;
      const iptn = parametric_scale.intervallic_pattern;
      const vdir = parametric_scale.registral_scale_direction;
      const vptn = parametric_scale.registral_pattern;
      this.registral_return_form = new RegistralReturnForm(notes);

      /*
      [
        ["IR", "P", "P", "P", "VP"],
        ["--", "--", "D", "--", "--"],
        ["R", "IP", "ID", "IP", "VR"],
      ];
      [
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
      ];
      */
      this.symbol = "P";

      // TODO: retrospective バージョンで closure か否かが変わってくる
      this.intervallic_closure = idir.closure_degree * iptn.closure_degree;
      this.registral_closure = vdir.closure_degree;
      // Reverse
      const is_reversal = (vdir === mL || idir === mL) && iptn === AB;

      this.retrospective = Math.abs(this.intervals[0].semitones) <= 5; // TODO: この条件であっているかメモを確認する

      if (is_reversal) this.retrospective = !this.retrospective;
    }
  }
}
