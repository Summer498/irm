import { Note } from "tonal"
import { Interval } from "tonal"
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
type Motion = "MR/AA" | "MN/AA" | "ML/AB";
type ArchetypeSymbol = "P" | "IP" | "VP" | "R" | "IR" | "VR" | "D" | "ID" | "M" | "dyad"
class ParametricScale {
  interval: Motion
  registral: Motion
  constructor(interval: IntervalLiteral) {
    this.interval = "MR/AA";
    this.registral = "MR/AA";
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
  registral_return_form: RegistralReturnForm | null;
  notes: NoteLiteral[]

  constructor(notes: string[]) {
    this.notes = notes;
    this.retrospective = false;
    this.intervallic_realization = false; //とりあえず
    this.registral_realization = false; //とりあえず
    this.registral_return_form = null;

    switch (notes.length) {
      case 1:
        this.symbol = "M";
        break;
      case 2:
        this.symbol = "dyad";
        break;
      case 3:
        const parametric_scale = [
          new ParametricScale(Interval.distance(notes[0], notes[1])),
          new ParametricScale(Interval.distance(notes[1], notes[2])),
        ]
        //TODO: parametricScale2Archetype
        this.symbol = "P"; //とりあえず
        this.retrospective = false; //とりあえず
        this.intervallic_realization = true; //とりあえず
        this.registral_realization = true; //とりあえず
        this.registral_return_form = new RegistralReturnForm(notes);
        break;
      default:
        throw new Error(`Invalid argument length. Required 1~3 arguments but given was ${notes.length}: ${notes}`)
    }
  }
}
