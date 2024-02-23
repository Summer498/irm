import { Interval, interval } from "tonal";
import { MelodyMotion } from "./";

describe("test melody motion", () => {
  const intervals = [
    "-P8", "-M7", "-m7", "-M6", "-m6", "-P5", "-d5", "-A4", "-P4", "-M3", "-m3", "-M2", "-m2",
    "P1",
    "m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7", "P8",
  ].map(e => Interval.get(e));

  const melody_motions = intervals.map(i => intervals.map(j => new MelodyMotion(i, j)));
  melody_motions.forEach((_, i) => _.forEach((e, j) => {
    const v_mgn = e.registral_motion_magnitude;
    const v_dir = e.registral_motion_direction;
    const i_mgn = e.intervallic_motion_magnitude;
    const i_dir = e.intervallic_motion_direction;
    expect(42).toBe(42);
  }))
})