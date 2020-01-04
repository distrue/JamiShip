import React from 'react';
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
  const mapLogItem = (v: LogItem, i: number) => (
    <div className={v.level} key={i}>{v.value}</div>
  )
  return (
    <Container>
      {props.logData.map(mapLogItem)};
    </Container>
  );
}

const Container = styled.div`
  .log {}
  .warn {
    color: rgb(225, 192, 76);
  }
  .error {
    color: #FF0000;
  }
`;

export default Logger;
