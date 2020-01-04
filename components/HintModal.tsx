import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClose, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

interface HintModalProps {
  text: string[];
  visible: boolean;
  onClose: () => unknown;
  index: number;
  setIndex: (p: number) => unknown;
}

export default function HintModal(props: HintModalProps) {
  const {text, visible, index, onClose, setIndex} = props;
  if (!visible) return null;
  useEffect(() => {
    if(text.length === 0) {
      onClose();
    }
  })
  return (
    <Container>
      <div className="close">
        &nbsp;도움말
        <MdClose onClick={onClose} />
      </div>
      <div className="text" dangerouslySetInnerHTML={ {__html: text[index]}} />
      <div className="control">
        <MdNavigateBefore onClick={() => setIndex(Math.max(0, index-1))} />
        <MdNavigateNext onClick={() => setIndex(Math.min(text.length-1, index+1))}/>
      </div>
    </Container>
  )
}

const Container = styled.div`
  & {
    position: fixed;
    min-height: 35vh;
    width: 50vw;
    left: 5vw;
    top: 15vh;
    margin: auto;
    background-color: #FFF;
    border-radius: 8px;
    z-index: 500000;
    box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.38);
    padding: 8px;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 32px auto 32px;
  }
  .close {
    grid-row: 1 / 2;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    user-select: none;
    & svg {
      margin-left: auto;
      cursor: pointer;
      height: 28px;
      width: 28px;
      fill: #555;
    }
  }
  .text {
    grid-row: 2 / 3;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    & span {
      margin: 4px;
    }
  }
  .control {
    grid-row: 3 / 4;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    padding: 0 8px;
    box-sizing: border-box;
    font-size: 24px;
    color: #888;
    user-select: none;
    & span {
      margin-right: 8px;
    }
    & svg {
      cursor: pointer;
      height: 28px;
      width: 28px;
    }
  }
`;
