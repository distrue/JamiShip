import React, { useEffect } from 'react';
import styled from 'styled-components';

export interface LogItem {
  level: 'log' | 'warn' | 'error';
  value: string;
}

interface LoggerProps {
  count: number;
  logData: any;
}

const Logger = (props: LoggerProps) => {
  const endRef: React.RefObject<HTMLDivElement> = React.createRef();
  const mapLogItem = (v: LogItem, i: number) => (
    <div className={v.level} key={i}>{v.value}</div>
  );
  useEffect(() => {
    endRef.current!.scrollIntoView();
  })
  return (
    <Container>
      {props.logData.map(mapLogItem)}
      <div ref={endRef} />
    </Container>
  );
};

const Container = styled.div`
  .log {
    color: #FFF;
  }
  .warn {
    color: rgb(225, 192, 76);
  }
  .error {
    color: #FF0000;
  }
  & {
    background-color: #222;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    overflow-x: wrap;
    overflow-y: scroll;
  }
`;

export default Logger;
