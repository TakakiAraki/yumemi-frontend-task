export interface ResourceError {
  state: "ERROR";
  result: {
    code: string;
    message: string;
  };
}

export interface ResourceSuccess<T extends any> {
  state: "SUCCESS";
  result: T;
}

export type ResourceResult<T extends any> = Promise<ResourceSuccess<T> | ResourceError>;
