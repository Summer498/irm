class _Direction {
  name: string;
  closure_degree: number;
  constructor(name: string, closure_degree:number) {
    this.name = name;
    this.closure_degree = closure_degree;
  }
}

class _Pattern {
  name: string;
  closure_degree: number;
  constructor(name: string, closure_degree:number) {
    this.name = name;
    this.closure_degree = closure_degree;
  }
}

export type Direction = _Direction;
export type Pattern = _Pattern;
export const mL = new _Direction("mL", 1);  // motion left (toward closure)
export const mN = new _Direction("mN", 0);  // motion nil (no motion)
export const mR = new _Direction("mR", -1);  // motion right (toward non-closure)
export const AA = new _Pattern("AA", 1);  // similar
export const AB = new _Pattern("AB", 2);  // different
// NOTE: とりあえず closure degree を 1 と 2 にしているが、もっと細かな差異がありそう