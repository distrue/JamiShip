import { UserCode, LogFunc, Logger, RunnerControls } from './types';

/**
 * @description 외부 코드를 실행 가능하도록 하는 환경을 생성합니다.
 * @param input 실행할 외부 코드
 * @param injectKey
 */
function makeFunc(input: string): UserCode {
  // eslint-disable-next-line
  return new Function(`
    return (function() {
      let Game = window.interfaceJA;
      const setGame = (key) => {
        if(!Game.setGame) return;
        Game.setGame(key);
        Game = window.interfaceJA;
      };
      ${input}
      const initDefault = () => {
        throw new Error('Exec error: Init undefined');
      }
      const loopDefault = () => {
        throw new Error('Exec error: Loop undefined');
      }
      const setupDefault = () => {}
      const initFunc = typeof(init) === 'undefined' ? initDefault : init;
      const setupFunc = typeof(setup) === 'undefined' ? setupDefault : setup;
      const loopFunc = typeof(loop) === 'undefined' ? loopDefault : loop;
      return {
        init: initFunc,
        loop: loopFunc,
        setup: setupFunc
      };
    })();
  `)();
}

/**
 * @description global scope로 코드를 삽입합니다. 반환되는 키를 build에 사용하면 삽입된 코드가 JA 오브젝트로 됩니다.
 * @param controls 삽입할 JA 오브젝트
 * @returns 삽입 키
 */
function injectCode(logger: Logger, controls: RunnerControls) {
  (window as any).logger = logger;
  // Inject other controls (component)
  (window as any).interfaceJA = controls;
}

/**
 * @description `Executor`는 외부 코드를 실행하면서 상태를 유지하기 위한 클래스입니다.
 */
export default class Executor {
  private code: string;
  private logger: Logger;
  constructor(logger: LogFunc, controls: RunnerControls) {
    this.code = '';
    this.logger = {
      error: (v) => logger('error', v),
      log: (v) => logger('log', v),
      warn: (v) => logger('warn', v),
      dir: (v) => logger('dir', v),
    };
    injectCode(this.logger, controls);
  }
  public inject(controls: RunnerControls) {
    injectCode(this.logger, controls);
  }
  public setCode(code: string) {
    this.code = code;
  }
  /**
   * @description code를 실행가능하도록 compile합니다.
   * @param code 실행할 외부 코드
   * @param injectKey `JA` 오브젝트에 대한 키
  */
  public getExec(): UserCode {
    return makeFunc(this.code);
  }
}
