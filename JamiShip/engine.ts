const frameRun = (frameNum: any) => {
  console.log(frameNum.startFrame, frameNum.endFrame);
  return 0;
};

const loop = (frame: any) => {
  setTimeout(async () => {
    loop(frame);
    if (frame.startFrame - 1 === frame.endFrame) {
      throw Error(`previous frame is not finished: ${frame.startFrame} / ${frame.endFrame}`);
    }
    frame.startFrame += 1;
    const now = await frameRun(frame);
    if (now === 0) frame.endFrame += 1;
    else console.log(`unexpected return: ${now}`);
  }, 200);
};

const start = () => {
  const frame = {
    startFrame: 0,
    endFrame: 0,
  };

  try {
    loop(frame);
  } catch (err) {
    console.log(`error occured in engine loop (Frame #${frame.startFrame}): ${err}`);
  }
};

export default start;
