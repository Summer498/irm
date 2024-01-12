class _Direction {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class _Pattern {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export type Direction = _Direction;
export type Pattern = _Pattern;
export const mL = new _Direction("mL");  // motion left (toward closure)
export const mN = new _Direction("mN");  // motion nil (no motion)
export const mR = new _Direction("mR");  // motion right (toward non-closure)
export const AA = new _Pattern("AA");  // similar
export const AB = new _Pattern("AB");  // different
