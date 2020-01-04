import React, {useState} from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import engine from '../JamiShip/engine';
import { BaseObj, checkRectOverlap } from '../JamiShip/component';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  ssr: false
});

export default () => {
  const [code, setCode] = useState('');
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
        <CodeEditor className="cli" onChange={setCode} value={code} />
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
`;
