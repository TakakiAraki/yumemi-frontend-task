/**
 * fetch自体が失敗した場合
 */
export class RequestError extends Error {
  constructor(public url: RequestInfo | URL, public init?: RequestInit) {
    super();
    this.name = "RequestError";
    this.message = `
endpoint: ${url}
init
\`\`\`json
${JSON.stringify(init)}
\`\`\`
`;
  }
}
