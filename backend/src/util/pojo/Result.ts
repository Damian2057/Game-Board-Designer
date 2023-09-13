export class Result {
  message: string;

  constructor(result: any) {
    if (result.affected) {
      if (result.affected > 0) {
        this.message = 'success';
      } else {
        this.message = 'failure';
      }
    }
  }
}