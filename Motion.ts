class _Motion {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export type Motion = _Motion
export const mL_AA = new _Motion("mL/AA");  // motion left and similar
export const mL_AB = new _Motion("mL/AB");  // motion left and different
export const mR_AA = new _Motion("mR/AA");  // motion right and similar
export const mR_AB = new _Motion("mR/AB");  // motion right and different
export const mN_AA = new _Motion("mN/AA");  // motion nil and similar
