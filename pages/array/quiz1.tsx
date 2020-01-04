import React from 'react';
import styled from 'styled-components';

export default () => {
  return (
    <Background>
      <div className="canvas">
        {/* canvas */}
      </div>
      <div className="cli">
        {/* cli */}
      </div>
      <div className="state">
        {/* state */}
      </div>
    </Background>
  );
};

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
