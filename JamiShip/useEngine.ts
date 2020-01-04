import Executor from './core';
import { LogFunc, UserCode, Game } from './types';


let exec: Executor;
let game: Game<any>;

export default function useEngine(GAMES: any) {
  const setGame = (id: string) => {
    console.log(GAMES);
    if (!Object.keys(GAMES).includes(id)) {
      throw new Error('Game not found');
    }
    game = new (GAMES as any)[id]();
    exec.inject(game.controllers);
  };

  const init = (logger: LogFunc, codeObj: UserCode) => {
    try {
      console.log('nowgame', game);
      codeObj.init();
    } catch (err) {
      logger('error', err);
    }
  };

  const runLoop = async (logger: LogFunc, codeObj: UserCode) => {
    let frameNo = 1;
    try {
      while (frameNo < 10) {
        codeObj.loop(frameNo);
        logger('system', `${frameNo}프레임 실행`);
        const result = await game.frame(frameNo);
        if (result !== undefined) {
          logger('system', '게임의 결과:');
          logger('log', result);
          break;
        }
        frameNo += 1;
      }
    } catch (err) {
      logger('error', `Error running frame ${frameNo}`);
      logger('error', err);
    }
  };

  const start = async (logger: LogFunc, codeObj: UserCode) => {
    try {
      logger('system', '프로그램을 시작합니다.');
      init(logger, codeObj);
    } catch (err) {
      logger('error', 'Error during init');
      logger('error', err);
    }
    await runLoop(logger, codeObj);
    logger('system', '프로그램 종료');
  };

  const compile = (setCodeObj: (obj: UserCode) => unknown, logger: LogFunc, code: string) => {
    document.getElementById('canvas-container')!.innerText = '';
    if (!exec) {
      exec = new Executor(logger, { setGame });
    }
    try {
      exec.inject({ setGame });
      exec.setCode(code);
      const codeObj = exec.getExec();
      setCodeObj(codeObj);
      logger('system', '초기화되었습니다.');
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
