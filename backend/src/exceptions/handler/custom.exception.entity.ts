export class CustomExceptionEntity {
  statusCode: number;
  message: string
  timestamp: string
  path: string


  constructor(statusCode: number, message: string, timestamp: string, path: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = timestamp;
    this.path = path;
  }
}