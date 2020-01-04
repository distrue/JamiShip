import React from 'react';
import styled from 'styled-components';
import {MdHome} from 'react-icons/md';
import Link from 'next/link';

const TopBar = () => (
  <TopBarContainer>
    <>
      <Link href="/">
        <MdHome className="icon" />
      </Link>
      <span>JamiShip</span>
    </>
  </TopBarContainer>
);

const TopBarContainer = styled.div`
  & {
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
  .icon {
    height: 24px;
    width: 24px;
    margin-right: 16px;
    fill: #FFF;
    cursor: pointer;
  }
`;

export default TopBar;
