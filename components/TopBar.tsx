import React, { useState } from 'react';
import styled from 'styled-components';
import { MdHome } from 'react-icons/md';
import { useRouter } from 'next/router';
import HintModal from './HintModal';

interface TopBarProps {
  help?: string[];
}

const TopBar = (props: TopBarProps) => {
  const [helpVisible, setHelpVisible] = useState(props.help !== undefined && props.help.length > 0);
  const [helpIndex, setHelpIndex] = useState(0);
  const router = useRouter();
  const exitHandler = () => {
    console.log(router.pathname);
    if (router.pathname.startsWith('/learn/')) {
      // eslint-disable-next-line
      if (!confirm('페이지를 정말 나갈까요?')) {
        return;
      }
    }
    router.push('/');
  };
  let helpBtn;
  if (props.help !== undefined && props.help.length > 0) {
    helpBtn = (
      <span className="helpBtn" onClick={() => setHelpVisible(true)}>도움말 보기</span>
    );
  }
  return (
    <>
      <TopBarContainer>
        <>
          <div className="home" onClick={exitHandler}><MdHome /></div>
          <span>JamiShip</span>
          {helpBtn}
        </>
      </TopBarContainer>
      <HintModal
        text={props.help!}
        visible={helpVisible}
        onClose={() => setHelpVisible(false)}
        index={helpIndex}
        setIndex={setHelpIndex}
      />
    </>
  );
};

const TopBarContainer = styled.div`
  & {
    z-index: 100000;
    height: 60px;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #ff9128;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
  }
  span {
    color: #FFF;
    font-size: 24px;
  }
  .home {
    & svg {
      height: 24px;
      width: 24px;
      margin-right: 16px;
      fill: #FFF;
      cursor: pointer;
    }
  }
  .helpBtn {
    margin-left: auto;
    cursor: pointer;
    font-size: 16px;
  }
`;

export default TopBar;
