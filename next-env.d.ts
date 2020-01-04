// <reference types="next" />
// <reference types="next/types/global" />
declare namespace logger {
  const log: (v: string) => unknown;
  const error: (v: string) => unknown;
  const warn: (v: string) => unknown;
}