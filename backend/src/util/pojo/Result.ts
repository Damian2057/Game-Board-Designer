export class Result {
  result: string;

  constructor(result: any) {
    if (result.affected) {
      if (result.affected > 0) {
        this.result = 'success';
      } else {
        this.result = 'failure';
      }
    }
  }
}