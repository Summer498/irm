import { Note } from "tonal"
import { Interval } from "tonal"
import { Motion, mL_AA, mL_AB, mN_AA, mR_AA, mR_AB } from "./Motion";

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
  interval: Motion
  registral: Motion
  constructor(prev_interval: IntervalLiteral, post_interval: IntervalLiteral) {
    const prev = Interval.semitones(prev_interval);
    const post = Interval.semitones(post_interval);
    // registral
    if (Math.sign(prev) !== Math.sign(post)) {
      this.registral = mL_AB;
    } else if (prev === 0) {
      this.registral = mN_AA;
    } else {
      this.registral = mR_AA
    }

    // interval
    // mL: prev > post
    // mR: prev < post
    // TODO: differentiation の反映
      // m3 が重複する。どう扱うか？
    if (-Interval.semitones("m3") <= post - prev) {
      this.interval = mL_AA;
    }
    else if (post === prev){
      this.interval = mN_AA;
    }
    else if (post - prev <= Interval.semitones("m3")) {
      this.interval = mR_AA;
    }

    this.interval = mR_AA;
  }
}

class RegistralReturnForm {
  notes: NoteLiteral[]
  return_degree: IntervalLiteral;
  constructor(notes: NoteLiteral[]) {
    if (notes.length !== 3) { throw new Error(`Invalid argument length. Required 3 arguments but given was ${notes.length}: ${notes}`); }
    this.notes = notes;
    this.return_degree = Interval.distance(notes[0], notes[2]);
    // TODO: aba系ではない場合は null オブジェクトを作成する
  }
}
class Archetype {
  symbol: ArchetypeSymbol
  retrospective: boolean;
  intervallic_realization: boolean;
  registral_realization: boolean;
  is_closure: boolean;
  registral_return_form: RegistralReturnForm | null;
  notes: NoteLiteral[]

  constructor(notes: string[]) {
    this.notes = notes;
    // default values are all false
    this.retrospective = false;
    this.intervallic_realization = false;
    this.registral_realization = false;
    this.is_closure = false;
    this.registral_return_form = null;

    switch (notes.length) {
      case 1:
        this.symbol = "M";
        break;
      case 2:
        this.symbol = "dyad";
        break;
      case 3:
        const parametric_scale = new ParametricScale(Interval.distance(notes[0], notes[1]), Interval.distance(notes[1], notes[2]));
        //TODO: parametricScale2Archetype
        this.registral_return_form = new RegistralReturnForm(notes);
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
        break;
      default:
        throw new Error(`Invalid argument length. Required 1~3 arguments but given was ${notes.length}: ${notes}`)
    }
  }
}
