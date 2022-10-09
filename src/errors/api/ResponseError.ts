/**
 * fetchは成功したが、endpointの都合で発生
 */
export default class ResponseError<T extends Response = any> extends Error {
  constructor(public target: T) {
    super();
    this.name = "ResponseError";
    this.message = `
endpoint: ${target.url}
status: ${target.status}
`;
  }
}
