import React from 'react';
import styled from 'styled-components';

import engine from '../JamiShip/engine';
import { BaseObj, checkRectOverlap } from '../JamiShip/component';

export default () => {
  React.useEffect(() => {
    engine();
    const testBase = new BaseObj('map-canvas', ['https://cdn.auth0.com/blog/react-js/react.png'], true, { x: 100, y: 100 });
    const testBase2 = new BaseObj('map-canvas', ['https://cdn.auth0.com/blog/react-js/react.png'], true, { x: 100, y: 100 }, { x: 80, y: 80 });
    console.log(testBase.getInnerRect());
    console.log(checkRectOverlap(testBase.getInnerRect(), testBase2.getInnerRect()));
  }, []);

  return (
    <>
      <canvas id="map-canvas" width="300px" height="300px">
        canvas
      </canvas>
      <Background>
        <div className="cli" />
        <div className="state">
            state
        </div>
      </Background>
    </>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0; left: 0;
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
