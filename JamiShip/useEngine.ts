export default function useEngine() {
  const frameRun = (logger:any, codeObj:any) => {
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

  const init = (logger:any, codeObj:any) => {
    if (codeObj === null) {
      alert('Code is not loaded!');
      return;
    }
    try {
      codeObj.init();
    } catch (err) {
      logger('error', err);
    }
  };

  const loop = (logger:any, codeObj: any, frame: any) => {
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

  const start = (logger:any, codeObj: any) => {
    const frame = {
      startFrame: 0,
      endFrame: 0,
    };

    try {
      init(logger, codeObj);
      loop(logger, codeObj, frame);
    } catch (err) {
      console.log(`error occured in engine loop (Frame #${frame.startFrame}): ${err}`);
    }
  };

  const compile = (exec:any, setCodeObj:any, logger:any, code: any) => {
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
    start,
    compile,
  };
}
