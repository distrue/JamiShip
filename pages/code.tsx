import React, {useState} from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';
import { injectCode, build, ForeignCode } from '../JamiShip/Execute';
import Logger, {LogItem} from '../components/Logger';

const defaultCode = `const a = 123;
const b = 234;
let c = 'AAA';

const init = () => {
  logger.log(a+b);
};
function loop() {
  logger.log(c);
}`;

const CodePage = (): JSX.Element => {
  const [codeValue, setCodeValue] = useState(defaultCode);
  const [codeObj, setCodeObj] = useState<ForeignCode | null>(null);
  const [injectKey, setInjectKey] = useState('');
  const [log, setLog] = useState(0);
  const [logData, setLogData] = useState<LogItem[]>([]);

  const logFactory = (level: 'log' | 'warn' | 'error', value: string) => {
    const data = logData;
    const cnt = data.push({level, value: value.toString()});
    setLog(cnt);
    setLogData(data);
  }

  const injector = (): string => {
    return injectCode({
      logger: {
        log: (v) => logFactory('log', v),
        warn: (v) => logFactory('warn', v),
        error: (v) => logFactory('error', v)
      }
    });
  }

  const loadHandler = () => {
    const newInjectKey = injector();
    setCodeObj(build(codeValue, newInjectKey));
    if (injectKey !== '') {
      delete (window as any)[injectKey];
    }
    setInjectKey(newInjectKey);
  };
  const initHandler = () => {
    if (codeObj === null) {
      alert('Code is not loaded!');
      return;
    }
    try {
      codeObj.init();
    } catch (err) {
      logger.error(err);
    }
  };
  const loopHandler = () => {
    if (codeObj === null) {
      alert('Code is not loaded!');
      return;
    }
    try {
      codeObj.loop();
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Container>
      <CodeEditor onChange={setCodeValue} value={codeValue}
        style={{
          gridRow: "1 / 3",
          gridColumn: "1 / 2",
          width: "100%",
          height: "100%"
        }}/>
      <div className="controls">
        <button onClick={loadHandler}>Reload</button>
        <button onClick={initHandler}>Init()</button>
        <button onClick={loopHandler}>Loop()</button>
      </div>
      <div className="display">
        <Logger count={log} logData={logData} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  & {
    display: grid;
    height: 100vh;
    grid-template-columns: auto 16px auto;
    grid-template-rows: 36px auto;
    box-sizing: border-box;
  }
  .code {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
  }
  .display {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
  }
  .controls {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }
`;

export default CodePage;