import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import useEngine from '../JamiShip/useEngine';
import { ForeignCode } from '../JamiShip/Execute';
import Logger, { LogItem } from '../components/Logger';
import { BaseObj } from '../JamiShip/component';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  ssr: false,
});

const defaultCode = `function init() {
    
}
function loop() {
    
}`;

export default () => {
  // eslint-disable-next-line
  const [code, setCode] = useState(defaultCode);
  const [codeObj, setCodeObj] = useState<ForeignCode | null>(null);
  const [log, setLog] = useState(0);
  const [logData, setLogData] = useState<LogItem[]>([]);
  const { start, compile } = useEngine();

  // eslint-disable-next-line
  const logger = ((level: 'log' | 'warn' | 'error', value: string) => {
    const data = logData;
    const cnt = data.push({ level, value: value.toString() });
    setLog(cnt);
    setLogData(data);
  });
  const [canvases] = React.useState(['canvas1', 'canvas2']);

  React.useEffect(() => {
    const testBase = new BaseObj('canvas1', ['https://cdn.auth0.com/blog/react-js/react.png'], false, { x: 100, y: 100 });
    const testBase2 = new BaseObj('canvas2', ['https://cdn.auth0.com/blog/react-js/react.png'], false, { x: 100, y: 100 }, { x: 100, y: 100 });
    testBase.moveToWithCheckBump([testBase2], 550, 200, 1000).then(() => testBase2.moveToWithCheckBump([testBase], 700, 120, 2000))
      .then(() => testBase.moveToWithCheckBump([testBase2], 400, 170, 1500)).then(() => testBase2.moveToWithCheckBump([testBase], 300, 200, 200));

    testBase2.moveToWithCheckBump([testBase], 450, 250, 1000).then(() => testBase.moveToWithCheckBump([testBase2], 200, 10, 2000))
      .then(() => testBase2.moveToWithCheckBump([testBase], 100, 140, 1500)).then(() => testBase.moveToWithCheckBump([testBase2], 300, 200, 200));
    // eslint-disable-next-line
  }, []);

  const startHandler = () => {
    if (codeObj === null) {
      alert('Code not loaded!')
    } else {
      start(logger, codeObj);
    }
  }
  const compileHandler = () => {
    compile(setCodeObj, logger, code);
  }

  return (
    <>
      <Background>
        {canvases.map((name) => {
          return (
            <canvas key={name} className="canvas" id={name} width="1000px" height="300px">
              canvas
            </canvas>
          );
        })}
        <CodeEditor className="cli" onChange={setCode} value={code} />
        <div className="state">
          <Logger count={log} logData={logData} />
        </div>
        <button type="button" className="t1" onClick={compileHandler}>Reload</button>
        <button type="button" className="t2" onClick={startHandler}>Init()</button>
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
