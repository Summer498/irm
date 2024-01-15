import { Interval } from "tonal";
import { Direction, mL, mN, mR } from "./Direction";
import { AA, AB, Pattern } from "./Pattern";
import { TInterval } from "./tonalObjects";

const M3 = Interval.get("M3");
const m3 = Interval.get("m3");


export class ParametricScale {
  intervallic_scale_direction: Direction;
  intervallic_pattern: Pattern;
  registral_scale_direction: Direction;
  registral_pattern: Pattern;

  constructor(prev_interval: TInterval, post_interval: TInterval) {
    const prev = prev_interval.semitones;
    const post = post_interval.semitones;
    // registral
    if (Math.sign(prev) !== Math.sign(post)) {
      this.registral_scale_direction = mL;
      this.registral_pattern = AB;
    } else if (prev === 0) {
      this.registral_scale_direction = mN;
      this.registral_pattern = AB;
    } else {
      this.registral_scale_direction = mR;
      this.registral_pattern = AB;
    }

    // interval
    const THRESHOLD = (this.registral_pattern === AA ? M3 : m3).semitones;
    const interval = post - prev;
    this.intervallic_pattern = Math.abs(interval) < THRESHOLD ? AA : AB;
    const scale_direction_map = [mL, mN, mR];
    this.intervallic_scale_direction =
      scale_direction_map[Math.sign(interval) + 1];
    const expected_error1 = scale_direction_map[3];
    const expected_error2 = scale_direction_map[-1];
    throw new Error(`Expected error was not thrown`);
  }
}