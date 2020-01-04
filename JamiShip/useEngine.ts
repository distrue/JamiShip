import Executor, { LogFunc, ForeignCode } from './Execute';
import Game, { CircleGame } from './Game';

export default function useEngine() {
  let exec: Executor;
  let game: Game<any>;

  const setGame = (id: string) => {
    console.log(id);
    // TODO: parse id string
    game = new CircleGame();
    exec.inject(game.api);
  }

  const init = (logger: LogFunc, codeObj: ForeignCode) => {
    try {
      codeObj.init();
    } catch (err) {
      logger('error', err);
    }
  };

  const runLoop = async (logger: LogFunc, codeObj: ForeignCode) => {
    let frameNo = 1;
    try {
      while(true) {
        codeObj.loop();
        const cont = game.frame(frameNo);
        if (!cont) {
          break;
        }
        frameNo++;
      }
    } catch (err) {
      logger('error', `Error running frame ${frameNo}`);
      logger('error', err);
    }
  }

  const start = async (logger: LogFunc, codeObj: ForeignCode) => {
    try {
      init(logger, codeObj);
    } catch (err) {
      logger('error', 'Error during init');
      logger('error', err);
    }
    await runLoop(logger, codeObj);
  };

  const compile = (setCodeObj: (obj: ForeignCode) => unknown, logger: LogFunc, code: string) => {
    if (!exec) {
      exec = new Executor(logger, {setGame});
    }
    try {
      exec.setCode(code);
      const codeObj = exec.getExec();
      setCodeObj(codeObj);
      logger('log', 'Reloaded code');
      // setup은 컴파일 직후 실행 (ie. 페이지 로딩 후)
      codeObj.setup();
    } catch (err) {
      logger('error', 'Failed to load code');
      logger('error', err);
    }
  };

  return {
    start,
    compile,
  };
}
