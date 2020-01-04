import React from 'react';
import styled from 'styled-components';

interface Params {
  tempColor: boolean[];
  tempNum: number[];
}
export default ({ tempColor, tempNum }: Params) => {
  return (
    <Table>
      <tbody>
        <tr>
          <td className={`${tempColor[0] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[0] : ''}</td>
          <td className={`${tempColor[1] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[1] : ''}</td>
          <td className={`${tempColor[2] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[2] : ''}</td>
        </tr>
        <tr>
          <td className={`${tempColor[3] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[3] : ''}</td>
          <td className={`${tempColor[4] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[4] : ''}</td>
          <td className={`${tempColor[5] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[5] : ''}</td>
        </tr>
        <tr>
          <td className={`${tempColor[6] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[6] : ''}</td>
          <td className={`${tempColor[7] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[7] : ''}</td>
          <td className={`${tempColor[8] === false ? 'white' : 'black'}`}>{tempNum ? tempNum[8] : ''}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  position: relative;
  width: 200px;
  height: 200px;
  td{
    text-align: center;
    font-size: 25px;
    border: solid 1px black;
  }
  td.white {
    background-color: white;
  }
  td.black {
    background-color: black;
    color: white;
  }
`;
