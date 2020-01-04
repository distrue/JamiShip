import Executor, { LogFunc, ForeignCode } from './Execute';
import { BaseObj } from './component';

export default function useEngine() {
  let exec: Executor;
  let components: string[];

  const loadComponents = (canvases: string[]) => {
    components = canvases;
    console.log(components);
    const testBase = new BaseObj('canvas1', ['https://cdn.auth0.com/blog/react-js/react.png'], false, { x: 100, y: 100 });
    const testBase2 = new BaseObj('canvas2', ['https://cdn.auth0.com/blog/react-js/react.png'], false, { x: 100, y: 100 }, { x: 100, y: 100 });
    return [testBase, testBase2];
  };

  const frameRun = (logger: LogFunc, codeObj: ForeignCode) => {
    if (codeObj === null) {
      alert('Code is not loaded!');
      return;
    }
    try {
      codeObj.loop();
    } catch (err) {
      logger('error', err);
    }
  };

  const init = (canvases: BaseObj[], logger: LogFunc, codeObj: ForeignCode) => {
    try {
      codeObj.init();
      const [testBase, testBase2] = canvases;
      testBase.moveToWithCheckBump([testBase2], 550, 200, 1000).then(() => testBase2.moveToWithCheckBump([testBase], 700, 120, 2000))
        .then(() => testBase.moveToWithCheckBump([testBase2], 400, 170, 1500)).then(() => testBase2.moveToWithCheckBump([testBase], 300, 200, 200));
      testBase2.moveToWithCheckBump([testBase], 450, 250, 1000).then(() => testBase.moveToWithCheckBump([testBase2], 200, 10, 2000))
        .then(() => testBase2.moveToWithCheckBump([testBase], 100, 140, 1500)).then(() => testBase.moveToWithCheckBump([testBase2], 300, 200, 200));
    } catch (err) {
      logger('error', err);
    }
  };

  const loop = (logger: LogFunc, codeObj: ForeignCode, frame: any) => {
    setTimeout(async () => {
      loop(logger, codeObj, frame);
      if (frame.startFrame - 1 === frame.endFrame) {
        throw Error(`previous frame is not finished: ${frame.startFrame} / ${frame.endFrame}`);
      }
      frame.startFrame += 1;
      await frameRun(logger, codeObj);
      frame.endFrame += 1;
    }, 200);
  };

  const start = (canvases: BaseObj[], logger: LogFunc, codeObj: ForeignCode) => {
    const frame = {
      startFrame: 0,
      endFrame: 0,
    };
    try {
      init(canvases, logger, codeObj);
      loop(logger, codeObj, frame);
    } catch (err) {
      console.log(`error occured in engine loop (Frame #${frame.startFrame}): ${err}`);
    }
  };

  const compile = (setCodeObj: (obj: ForeignCode) => unknown, logger: LogFunc, code: string) => {
    if (!exec) {
      exec = new Executor(logger, {});
    }
    try {
      exec.setCode(code);
      setCodeObj(exec.getExec());
      logger('log', 'Reloaded code');
    } catch (err) {
      logger('error', 'Failed to load code');
      logger('error', err);
    }
  };

  return {
    loadComponents,
    start,
    compile,
  };
}
