import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';

interface TopBarProps {
  children: JSX.Element;
}

const Layout = (props: TopBarProps) => (
  <Container>
    <>
      <TopBar />
      {props.children}
    </>
  </Container>
);

const Container = styled.div`
  & {
    margin-top: 60px;
  }
`;

export default Layout;