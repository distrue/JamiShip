import React from 'react';
import styled from 'styled-components';
import Table from '../../components/bfs/table';
import Queue from '../../components/bfs/queue';

const Index = () => {
  const [tableColor, setTableColor] = React.useState<boolean[][]>([[]]);
  const [tableNum, setTableNum] = React.useState<number[][]>([[]]);
  const [queueNum, setQueueNum] = React.useState<number[]>([]);

  React.useState(() => {
    setTableColor([[false, true, true], [false, true, false], [false, false, false]]);
    setTableNum([[-1, -1, 1], [-1, -1, -1], [-1, -1, -1]]);
    setQueueNum([]);
  });

  return (
    <Background>
      <div className="canvas">
        <div className="table">
          <Table tempColor={tableColor} tempNum={tableNum} />
        </div>
      </div>
      <div className="cli">
        {/* cli */}
      </div>
      <div className="state">
        <Queue tempNum={queueNum} />
      </div>
    </Background>
  );
};
export default Index;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  .canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 65vw;
    height: 70vh;
    border: 1px solid black;
    .table{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .cli {
    position: absolute;
    top: 0px;
    left: 65vw;
    width: 35vw;
    height: 70vh;
    border: 1px solid black;
    background-color: #212121;
  }
  .state {
    position: absolute;
    top: 70vh;
    left: 0px;
    width: 100vw;
    height: 20vh;
    border: 1px solid black;
  }
`;
