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
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css);  
  * { font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif'; }
`;

export default Layout;