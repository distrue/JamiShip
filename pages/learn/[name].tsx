import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { MdRefresh, MdPlayArrow } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEngine, useLogger } from '../../JamiShip';
import { UserCode, LogItem } from '../../JamiShip/types';
import Logger from '../../components/Logger';
import TopBar from '../../components/TopBar';
import { GameDisplay, EmptyGame } from '../../games/gameList';

const CodeEditor = dynamic(import('../../components/CodeEditor'), {
  ssr: false,
});


export default function NamePage() {
  const router = useRouter();
  // eslint-disable-next-line
  const [executed, setExecuted] = useState(false);
  const [code, setCode] = useState("");
  const [codeObj, setCodeObj] = useState<UserCode | null>(null);
  const [help, setHelp] = useState<string[]>([]);
  const [logData, setLogData] = useState<LogItem[]>([]);
  const logger = useLogger(logData, setLogData);
  const [callee, setCallee] = useState(false);
  const { start, compile } = useEngine();

  React.useEffect(() => {
    const key = router.query.name;
    const filtered = GameDisplay.filter((x) => (x.id === key));
    const currentGame = filtered.length === 0 ? EmptyGame : filtered[0];
    setCode(currentGame.stub);
    setHelp(currentGame.tutorial);
  }, [router.query.name]);
  const startHandler = () => {
    if (executed) {
      compileHandler();
    }
    if (codeObj === null) {
      // eslint-disable-next-line no-alert
      alert('Code not loaded!');
    } else {
      start(logger, codeObj).then(() => setCallee(!callee)).catch(() => {});
      setExecuted(true);
    }
  };
  const compileHandler = () => {
    compile(setCodeObj, logger, code);
    setExecuted(false);
  };

  return (
    <>
      <TopBar help={help} />
      <Background>
        <div id="canvas-container" />
        <CodeEditor className="cli" onChange={setCode} value={code} />
        <div className="state">
          <Logger callee={callee} logData={logData} />
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
}

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
    background-color: #FFF;
    z-index: -1;
  }
  .cli {
    grid-row: 1 / 4;
    grid-column: 2 / 3;
    border: 1px solid black;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
  }
  .controls {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    background-color: #222;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 8px;
    z-index: 1;
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
    z-index: 1;
    grid-row: 3 / 4;
    grid-column: 1 / 2;
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
