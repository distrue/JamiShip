import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import useEngine from '../JamiShip/useEngine';
import Executor, { ForeignCode } from '../JamiShip/Execute';
import Logger, { LogItem } from '../components/Logger';
import { BaseObj, checkRectOverlap } from '../JamiShip/component';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  ssr: false,
});

export default () => {
  // eslint-disable-next-line
  let [exec, setExec] = useState<Executor>();
  const [code, setCode] = useState('');
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

  React.useEffect(() => {
    setExec(new Executor(logger, {}));
    const testBase = new BaseObj('map-canvas', ['https://cdn.auth0.com/blog/react-js/react.png'], true, { x: 100, y: 100 });
    const testBase2 = new BaseObj('map-canvas', ['https://cdn.auth0.com/blog/react-js/react.png'], true, { x: 100, y: 100 }, { x: 80, y: 80 });
    console.log(testBase.getInnerRect());
    console.log(checkRectOverlap(testBase.getInnerRect(), testBase2.getInnerRect()));
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <canvas id="map-canvas" width="300px" height="300px">
        canvas
      </canvas>
      <Background>
        <CodeEditor className="cli" onChange={setCode} value={code} />
        <div className="state">
          <Logger count={log} logData={logData} />
            state
        </div>
        <button type="button" className="t1" onClick={() => compile(exec, setCodeObj, logger, code)}>Reload</button>
        <button type="button" className="t2" onClick={() => start(logger, codeObj)}>Init()</button>
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
