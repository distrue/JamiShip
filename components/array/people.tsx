import React from 'react';
import styled from 'styled-components';

interface Params {
  hairColor: string;
  foldedFinger: number;
}
export default ({ hairColor, foldedFinger }: Params) => {
  return (
    <Person>
      <img className="person" src="/imgs/character.png" alt="person" />
      <img className="hair" src={`/imgs/hair_${hairColor}.png`} alt="hair" />
      <img className="hand" src={`/imgs/hand_${foldedFinger}.svg`} alt="hand" />
    </Person>
  );
};

const Person = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 100px;
  .person{
    position:absolute;
  }
  .hair{
    position:absolute;
  }
  .hand{
    position:relative;
  }
`;
