
export class SetFilter {

  private readonly set: Set<string>;

  constructor() {
    this.set = new Set<string>();
  }

  add(value: any): void {
    if (value != null && this.set.has(JSON.stringify(value)) === false) {
      this.set.add(JSON.stringify(value));
    }
  }

  get(): any[] {
    return Array.from(this.set).map(value => JSON.parse(value));
  }
}