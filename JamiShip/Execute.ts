type LogFunc = (input: any) => unknown;

export interface Logger {
  log: LogFunc;
  warn: LogFunc;
  error: LogFunc;
}

/**
 * @description `JA` 오브젝트에 담길 코드
 * 단, `logger`는 global 스코프에도 저장됩니다.
 */
export interface RunnerControls {
  logger: Logger;
}

/**
 * @description 실행 가능한 외부 코드
 */
export interface ForeignCode {
  init: () => unknown;
  loop: () => unknown;
}

/**
 * @description 외부 코드를 실행 가능하도록 하는 환경을 생성합니다.
 * @param input 실행할 외부 코드
 * @param injectKey 
 */
export function makeFunc(input: string, injectKey: string): ForeignCode {
  return new Function(`
    return (function() {
      const JA = window['${injectKey}'];
      ${input}
      const initDefault = () => {
        throw new Error('Exec error: Init undefined');
      }
      const loopDefault = () => {
        throw new Error('Exec error: Loop undefined');
      }
      const initFunc = typeof(init) === 'undefined' ? initDefault : init;
      const loopFunc = typeof(loop) === 'undefined' ? loopDefault : loop;
      return {
        init: initFunc,
        loop: loopFunc
      };
    })();
  `)();
}

/**
 * 
 * @param code 실행할 외부 코드
 * @param injectKey `JA` 오브젝트에 대한 키 
 */
export function build(code: string, injectKey: string): ForeignCode {
  try {
    return makeFunc(code, injectKey);
  } catch (err) {
    throw err;
  }
}

/**
 * @description global scope로 코드를 삽입합니다. 반환되는 키를 build에 사용하면 삽입된 코드가 JA 오브젝트로 됩니다.
 * @param controls 삽입할 JA 오브젝트
 * @returns 삽입 키
 */
export function injectCode(controls: RunnerControls): string {
  const intKey = `interface${Math.floor(10000000*Math.random())}`;
  // Inject RunnerRequiredControls
  (window as any).logger = controls.logger;
  // Inject other controls (component)
  (window as any)[intKey] = controls;
  return intKey;
}
