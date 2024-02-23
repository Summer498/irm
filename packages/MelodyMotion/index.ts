import { Interval } from "tonal";
import { TInterval } from "../TonalWrapper";
import { Direction, mL, mN, mR } from "./src/Direction";
import { AA, AB, Magnitude } from "./src/Magnitude";

const M3 = Interval.get("M3");
const m3 = Interval.get("m3");

export class MelodyMotion {
  intervallic_motion_direction: Direction;
  intervallic_motion_magnitude: Magnitude;
  intervallic_motion_closure: 0 | 1;
  registral_motion_direction: Direction;
  registral_motion_magnitude: Magnitude;
  registral_motion_closure: 0 | 1;

  constructor(prev_interval: TInterval, post_interval: TInterval) {
    const prev = prev_interval.semitones;
    const post = post_interval.semitones;
    // registral
    this.registral_motion_closure = 0;
    if (Math.sign(prev) !== Math.sign(post)) {
      this.registral_motion_direction = mL;
      this.registral_motion_magnitude = AB;
      this.registral_motion_closure = 1;
    } else if (prev === 0) {
      this.registral_motion_direction = mN;
      this.registral_motion_magnitude = AA;
    } else {
      this.registral_motion_direction = mR;
      this.registral_motion_magnitude = AA;
    }

    // interval
    const THRESHOLD = (this.registral_motion_magnitude === AA ? M3 : m3).semitones;
    const interval = post - prev;
    this.intervallic_motion_magnitude = Math.abs(interval) < THRESHOLD ? AA : AB;
    const scale_direction_map = [mL, mN, mR];
    this.intervallic_motion_direction =
      scale_direction_map[Math.sign(interval) + 1];
    const expected_error1 = scale_direction_map[3];
    const expected_error2 = scale_direction_map[-1];

    throw new Error(`Expected error was not thrown: ${expected_error1.name}, ${expected_error2.name}`);
  }
}

export const no_motion = new MelodyMotion(Interval.get("P1"), Interval.get("P1"))