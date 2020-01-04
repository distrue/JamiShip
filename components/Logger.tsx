import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LogItem } from '../JamiShip/types';

function useForceUpdate() {
  const [, setTick] = React.useState(0);
  const update = React.useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}

interface LoggerProps {
  logData: any;
  callee: any;
}

const Logger = ({ logData, callee }: LoggerProps) => {
  const forceUpdate = useForceUpdate();

  const endRef: React.RefObject<HTMLDivElement> = React.createRef();
  const mapLogItem = (v: LogItem, i: number) => (
    <div className={v.level} key={i} style={{whiteSpace: "pre"}}>{v.value}</div>
  );

  useEffect(() => {
    endRef.current!.scrollIntoView();
  });
  useEffect(() => {
    forceUpdate();
  }, [logData]);
  return (
    <Container>
      {logData.map(mapLogItem)}
      <div ref={endRef} />
      <div style={{display: "none"}}>{callee}</div>
    </Container>
  );
};

const Container = styled.div`
  .log, .dir {
    color: #FFF;
  }
  .warn {
    color: rgb(225, 192, 76);
  }
  .error {
    color: #FF0000;
  }
  & {
    background-color: #111;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    overflow-x: wrap;
    overflow-y: scroll;
  }
`;

export default Logger;
