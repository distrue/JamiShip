import Executor from './core';
import { LogFunc, UserCode } from './types';
import Game, { CircleGame } from './games/circleGame';
import {RaindropGame} from '../JamiShip/games/raindrop';

let exec: Executor;
let game: Game<any>;

export default function useEngine() {
  const setGame = (id: string) => {
    console.log(id);
    // TODO: parse id string
    if (id === 'raindrop') {
      game = new RaindropGame();
    } else {
      game = new CircleGame();
    }
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
      while (frameNo < 2) {
        codeObj.loop();
        logger('log', `Run code(Frame ${frameNo})`);
        const cont = game.frame(frameNo);
        if (!cont) {
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
      init(logger, codeObj);
    } catch (err) {
      logger('error', 'Error during init');
      logger('error', err);
    }
    await runLoop(logger, codeObj);
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
      logger('log', 'Compile code');
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
