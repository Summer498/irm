class PrivatePattern {
  name: string;
  closure_degree: number;
  constructor(name: string, closure_degree: number) {
    this.name = name;
    this.closure_degree = closure_degree;
  }
}

export type Pattern = PrivatePattern;
export const AA = new PrivatePattern("AA", 1); // similar
export const AB = new PrivatePattern("AB", 2); // different
// NOTE: とりあえず closure degree を 1 と 2 にしているが、もっと細かな差異がありそう
