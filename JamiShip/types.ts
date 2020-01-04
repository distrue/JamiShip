import { LogLevel } from "./useLogger";

/**
 * @description 실행 가능한 외부 코드
 */
export interface UserCode {
  init: () => unknown;
  loop: (frameNo: number) => unknown;
  setup: () => unknown;
}

export type LogFunc = (level: LogLevel, value: any) => unknown;
export interface LogItem {
  level: LogLevel;
  value: string;
}
export interface Logger {
log: (input: string) => unknown;
warn: (input: string) => unknown;
error: (input: string) => unknown;
dir: (input: string) => unknown;
}

/**
* @description `JA` 오브젝트에 담길 코드
*/
export interface RunnerControls {
setGame: (id: string) => unknown;
}

export interface Game<T> {
  controllers: T;
  frame: (frameNo: number) => Promise<any>;
}