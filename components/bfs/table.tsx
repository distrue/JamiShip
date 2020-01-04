import React from 'react';
import styled from 'styled-components';

interface Params {
  tempColor: boolean[][];
  tempNum: number[][];
}

export default ({ tempColor, tempNum }: Params) => {
  React.useEffect(() => {
    const canvas = document.getElementById('map-canvas');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (!ctx) {
      console.log("no canvas");
      return;
    }
    for (let i = 0; i < tempColor.length; i += 1) {
      for (let j = 0; j < tempColor[0].length; j += 1) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.fillStyle = tempColor[i][j] === false ? 'white' : 'black';
        ctx.strokeStyle = 'black';
        const x = 25 + 50 * j;
        const y = 25 + 50 * i;
        ctx.fillRect(x, y, 50, 50);
        ctx.strokeRect(x, y, 50, 50);
        const num = tempNum[i][j] >= 0 ? String(tempNum[i][j]) : '';
        ctx.font = '20px Georgia';
        ctx.fillStyle = tempColor[i][j] === false ? 'black' : 'white';
        ctx.fillText(num, x + 25, y + 25);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* const Td = (props: Props) => (
    <td className={`${tempColor[props.row][props.col] === false ? 'white' : 'black'}`}>
    {tempNum[props.row][props.col] >= 0 ? tempNum[props.row][props.col] : ''}</td>
  ); */
  return (
    <Table>
      <canvas id="map-canvas" width="300px" height="300px">
        canvas
      </canvas>
    </Table>
  );
};

const Table = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;
