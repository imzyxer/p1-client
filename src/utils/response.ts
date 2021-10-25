export abstract class Response<T> {
  protected constructor(readonly result: T, readonly isInvalid: boolean) {}

  get isSuccessful(): boolean {
    return !this.isInvalid;
  }
}

export class SuccessResponse<T> extends Response<T> {
  constructor(result: T) {
    super(result, false);
  }
}

export class InvalidResponse<T> extends Response<T> {
  constructor(result: T) {
    super(result, true);
  }
}

export class InvalidConnection extends Response<any> {
  constructor() {
    super({ error: 'ERR_CONNECTION_REFUSED', message: 'This is a terrible error message' }, true);
  }
}
