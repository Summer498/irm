import { Interval, Note, NoteLiteral } from "tonal";
import { TInterval } from "../TonalWrapper";

export class RegistralReturnForm {
  is_null: boolean;
  notes: NoteLiteral[];
  return_degree: TInterval;
  constructor(notes: NoteLiteral[]) {
    this.is_null = true;
    if (notes.length !== 3) {
      throw new Error(
        `Invalid argument length. Required 3 arguments but given was ${notes.length} notes: ${JSON.stringify(notes)}`,
      );
    }
    this.notes = notes;
    if (Note.get(notes[0]) === Note.get("")) {
      // null object
      this.return_degree = Interval.get("");
      return;
    }
    this.return_degree = Interval.get(Interval.distance(notes[2], notes[0]));
    const direction1 = Math.sign(
      Interval.semitones(Interval.distance(notes[0], notes[1])),
    );
    const direction2 = Math.sign(
      Interval.semitones(Interval.distance(notes[1], notes[2])),
    );
    if (
      direction1 !== direction2 &&
      direction1 !== 0 && // TODO: 0 のときに registral return と判定されるかどうか本を確認する
      direction2 !== 0
    ) {
      this.is_null = false;
    }
  }
}

export const NULL_REGISTRAL_RETURN_FORM = new RegistralReturnForm(["", "", ""]);
