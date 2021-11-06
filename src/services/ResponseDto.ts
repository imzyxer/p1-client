class ResponseDto<T> {
  constructor(readonly result: T) {}
}
export default ResponseDto;

export class InvalidConnectionDto extends ResponseDto<any> {
  constructor() {
    super({ error: 'ERR_CONNECTION_REFUSED', message: 'This is a terrible error message' });
  }
}
