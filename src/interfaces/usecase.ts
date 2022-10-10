export interface UsecaseError {
  state: "ERROR";
  result: {
    code: string;
    message: string;
  };
}
export interface UsecaseSuccess<T> {
  state: "SUCCESS";
  result: T;
}

export type UsecaseResult<T> = UsecaseSuccess<T> | UsecaseError;
