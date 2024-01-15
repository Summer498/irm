class PrivateDirection {
  name: string;
  closure_degree: number;
  constructor(name: string, closure_degree: number) {
    this.name = name;
    this.closure_degree = closure_degree;
  }
}

export type Direction = PrivateDirection;
export const mL = new PrivateDirection("mL", 1); // motion left (toward closure)
export const mN = new PrivateDirection("mN", 0); // motion nil (no motion)
export const mR = new PrivateDirection("mR", -1); // motion right (toward non-closure)
// NOTE: とりあえず closure degree を 1 と 2 にしているが、もっと細かな差異がありそう
