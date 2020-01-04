import React from 'react';
import styled from 'styled-components';

interface Params {
  tempNum: number[];
}
export default ({ tempNum }: Params) => {
  return (
    <Queue>
      {tempNum.map((num) => {
        return (
          <div className="item">
            <div className="text">{num}</div>
          </div>
        );
      })}
    </Queue>
  );
};

const Queue = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 100px;
  background-color: #e8affe;
  display: flex;
  flex-direction: row;
  .item {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0px 5px 0px 5px;
    width: 40px;
    height: 90px;
    border: 1px solid black;
  }
  .text{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 26px;
  }
`;
