/* eslint-disable no-unused-vars */
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly RESAS_API_KEY: string;
  }
}
