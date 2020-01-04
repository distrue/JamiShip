import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useEngine, useLogger } from '../JamiShip';
import { UserCode, LogItem } from '../JamiShip/types';
import Logger from '../components/Logger';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  ssr: false,
});

const defaultCode = `function setup() {
  setGame("circle");
  logger.dir(Game);
  Game.add(20, 20);
}
function init() {

}
function loop() {
  Game.move(2);
}`;

export default () => {
  // eslint-disable-next-line
  const [code, setCode] = useState(defaultCode);
  const [codeObj, setCodeObj] = useState<UserCode | null>(null);
  const { start, compile } = useEngine();

  const [logData, setLogData] = useState<LogItem[]>([]);
  const logger = useLogger(logData, setLogData);

  const startHandler = () => {
    if (codeObj === null) {
      alert('Code not loaded! please compile code');
    } else {
      start(logger, codeObj).then(() => console.log('complete'));
    }
  };
  const compileHandler = () => {
    compile(setCodeObj, logger, code);
  };

  return (
    <>
      <Background>
        <div id="canvas-container" />
        <CodeEditor className="cli" onChange={setCode} value={code} />
        <div className="state">
          <Logger logData={logData} />
        </div>
        <button type="button" className="t1" onClick={compileHandler}>Compile</button>
        <button type="button" className="t2" onClick={startHandler}>Run</button>
      </Background>
    </>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0; left: 0;
  grid-template-rows: 60% 40%;
  grid-template-columns: 60% 40%;
  display: grid;
  canvas {
    position: absolute;
  }
  .cli {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
    border: 1px solid black;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .state {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    border: 1px solid black;
  }
  .t1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .t2 {
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 3;
  }
`;
