import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import {MdRefresh, MdPlayArrow} from 'react-icons/md';
import { useRouter } from 'next/router';
import useEngine from '../../JamiShip/useEngine';
import { ForeignCode } from '../../JamiShip/Execute';
import Logger, { LogItem } from '../../components/Logger';
import TopBar from '../../components/TopBar';
import { GameDisplay, EmptyGame } from '../../JamiShip/gameList';

const CodeEditor = dynamic(import('../../components/CodeEditor'), {
  ssr: false,
});

const dirPrint = (value: Object) => {
  let ans = '[Game Object]';
  for (const [key, val] of Object.entries(value)) {
    ans = ans.concat('\n', `${key}: ${val.toString()}`);
  }
  console.log(ans);
  return ans;
};
export default function NamePage() {
  const router = useRouter();
  const key = router.query.name;
  const filtered = GameDisplay.filter((x) => (x.id === key));
  const currentGame = filtered.length === 0 ? EmptyGame : filtered[0];
  // eslint-disable-next-line
  const [code, setCode] = useState(currentGame.stub);
  const [codeObj, setCodeObj] = useState<ForeignCode | null>(null);
  const [log, setLog] = useState(0);
  const [logData, setLogData] = useState<LogItem[]>([]);
  const { start, compile } = useEngine();

  // eslint-disable-next-line
  const logger = ((level: 'dir' | 'log' | 'warn' | 'error', value: any) => {
    const data = logData;
    const cnt = data.push({
      level,
      value: level === 'dir' ? dirPrint(value) : value.toString(),
    });
    if (level === 'error') {
      console.error(value);
    }
    setLog(cnt);
    setLogData(data);
  });

  const startHandler = () => {
    if (codeObj === null) {
      // eslint-disable-next-line no-alert
      alert('Code not loaded!');
    } else {
      start(logger, codeObj).then(() => console.log('complete'));
    }
  };
  const compileHandler = () => {
    compile(setCodeObj, logger, code);
  };

  return (
    <>
      <TopBar />
      <Background>
        <div id="canvas-container" />
        <CodeEditor className="cli" onChange={setCode} value={code} />
        <div className="state">
          <Logger count={log} logData={logData} />
        </div>
        <div className="controls">
          <div className="control-item" onClick={compileHandler}>
            <MdRefresh />
          </div>
          <div className="control-item" onClick={startHandler}>
            <MdPlayArrow />
          </div>
        </div>
      </Background>
    </>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  box-sizing: border-box;
  position: absolute;
  top: 0; left: 0;
  grid-template-rows: 60% 36px calc(40% - 36px);
  grid-template-columns: 60% 40%;
  display: grid;
  canvas {
    position: absolute;
  }
  #canvas-container {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    width: 100%;
    height: 100%;
    background-color: #DDD;
  }
  .cli {
    grid-row: 1 / 4;
    grid-column: 2 / 3;
    border: 1px solid black;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .controls {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    background-color: #222;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 8px;
  }
  .control-item {
    z-index: 100000;
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
      cursor: pointer;
      width: 28px;
      height: 28px;
      margin-right: 8px;
      fill: #eee;
    }
  }
  .state {
    grid-row: 3 / 4;
    grid-column: 1 / 3;
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
