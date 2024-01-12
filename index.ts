import { Note } from "tonal"
import { Interval } from "tonal"
import { Direction, mL, mN, mR, Pattern, AA, AB } from "./Motion";

console.log(Note.get("C"))
console.log(Interval.distance("C4", "G4"))
console.log(Interval.distance("G4", "C4")); // 符号付き音程が取れる
console.log(Interval.semitones(Interval.distance("G4", "C4"))); // 符号付き音程クロマも取れる

// テスト用
const octave = [
  "Cb", "C", "C#",
  "Db", "D", "D#",
  "Eb", "E", "E#",
  "Fb", "F", "F#",
  "Gb", "G", "G#",
  "Ab", "A", "A#",
  "Bb", "B", "B#",
]

type NoteLiteral = string;  // TODO: import form tonal / define by myself
type IntervalLiteral = string;  // TODO: import from tonal / define by myself
type ArchetypeSymbol = "P" | "IP" | "VP" | "R" | "IR" | "VR" | "D" | "ID" | "M" | "dyad"

class ParametricScale {
  intervallic_scale_direction: Direction;
  intervallic_pattern: Pattern;
  registral_scale_direction: Direction;
  registral_pattern: Pattern;

  constructor(prev_interval: IntervalLiteral, post_interval: IntervalLiteral) {
    const prev = Interval.semitones(prev_interval);
    const post = Interval.semitones(post_interval);
    // registral
    if (Math.sign(prev) !== Math.sign(post)) {
      this.registral_scale_direction = mL;
      this.registral_pattern = AB;
    } else if (prev === 0) {
      this.registral_scale_direction = mN;
      this.registral_pattern = AB
    }
    else {
      this.registral_scale_direction = mR;
      this.registral_pattern = AB
    }

    // interval
    const THRESHOLD = Interval.semitones((this.registral_pattern === AA) ? "M3" : "m3")
    const interval = post - prev;
    this.intervallic_pattern = (Math.abs(interval) < THRESHOLD) ? AA : AB;
    const scale_direction_map = [mL, mN, mR];
    this.intervallic_scale_direction = scale_direction_map[Math.sign(interval) + 1];
    const expected_error1 = scale_direction_map[3];
    const expected_error2 = scale_direction_map[-1];
    throw new Error(`Expected error was not thrown`);
  }
}

class RegistralReturnForm {
  is_null: Boolean;
  notes: NoteLiteral[]
  return_degree: IntervalLiteral;
  constructor(notes: NoteLiteral[]) {
    this.is_null = true;
    if (notes.length !== 3) { throw new Error(`Invalid argument length. Required 3 arguments but given was ${notes.length} notes: ${notes}`); }
    this.notes = notes;
    if (notes[0] === "") {  // null object
      this.return_degree = "0";
      return;
    }
    this.return_degree = Interval.distance(notes[0], notes[2]);
    const direction1 = Math.sign(Interval.semitones(Interval.distance(notes[0], notes[1])))
    const direction2 = Math.sign(Interval.semitones(Interval.distance(notes[1], notes[2])))
    if (
      direction1 !== direction2
      && direction1 !== 0  // TODO: 0 のときに registral return と判定されるかどうか確認する
      && direction2 !== 0
    ) {
      this.is_null = false;
    }
  }
}
const NULL_REGISTRAL_RETURN_FORM = new RegistralReturnForm(["", "", ""]);

class Archetype {
  symbol: ArchetypeSymbol
  retrospective: boolean;
  intervallic_closure: number;
  registral_closure: number;
  registral_return_form: RegistralReturnForm;
  notes: NoteLiteral[];
  intervals: IntervalLiteral[];

  constructor(notes: string[]) {
    this.notes = notes;
    const notes_num = notes.length;
    if (notes_num !== 3) {
      this.retrospective = false;
      this.intervallic_closure = 0;
      this.registral_closure = 0;
      this.registral_return_form = NULL_REGISTRAL_RETURN_FORM;
      if (notes_num === 1) this.symbol = "M";
      else if (notes_num === 2) this.symbol = "dyad";
      else throw new Error(`Invalid length of notes. Required 1, 2, or, 3 notes but given was ${notes.length} notes: ${notes}`)
    }
    else {
      this.intervals = [
        Interval.distance(notes[0], notes[1]),
        Interval.distance(notes[1], notes[2]),
      ]
      const parametric_scale = new ParametricScale(Interval.distance(notes[0], notes[1]), Interval.distance(notes[1], notes[2]));
      const idir = parametric_scale.intervallic_scale_direction;
      const iptn = parametric_scale.intervallic_pattern;
      const vdir = parametric_scale.registral_scale_direction;
      const vptn = parametric_scale.registral_pattern;
      this.registral_return_form = new RegistralReturnForm(notes);

      [
        ['IR',  'P',  'P',  'P', 'VP',],
        ['--', '--',  'D', '--', '--',],
        [ 'R', 'IP', 'ID', 'IP', 'VR',],
      ];
      [
        [1,0,0,0,0],
        [0,0,0,0,0],
        [1,0,0,0,1],
      ];

      // Process
      if (parametric_scale.registral === mR_AA &&
        (parametric_scale.interval === mR_AA
          || parametric_scale.interval === mN_AA
          || parametric_scale.interval === mL_AA)
      ) {
        this.symbol = "P";
        this.intervallic_realization = true;
        this.registral_realization = true;
      } else if (
        parametric_scale.registral === mR_AA
        && parametric_scale.interval === mR_AB) {
        this.symbol = "VP";
        this.registral_realization = true;
      } else {
        throw new Error(`Unconsidered condition: parametric_scale.interval.name=${parametric_scale.interval.name}, parametric_scale.registral.name=${parametric_scale.registral.name}`);
      }
    }
  }
}
