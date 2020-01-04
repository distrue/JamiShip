import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from '../components/Layout';

interface GameItemProps {
  image: string;
  title: string;
  detail: string;
  link: string;
}

const GameItem = (props: GameItemProps) => (
  <ItemContainer>
    <Link href={props.link}>
      <div>
        <div className="image">
          <img src={props.image} />
        </div>
        <h2>{props.title}</h2>
        <span>{props.detail}</span>
      </div>
    </Link>
  </ItemContainer>
);

const items: GameItemProps[] = [
  {image: 'http://img2.sbs.co.kr/img/sbs_cms/CH/2017/03/14/CH33548709_w666_h968.jpg', title: '손병호게임', link: '/game/son', detail: '술게임으로 배우는 자바스크립트'},
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg', title: '플레이그라운드', link: '/playground', detail: '아무거나 하세요'},
]

const Main = () => (
  <Layout>
    <Container>
      <h1>학습 시작하기</h1>
      <div className="items">
        {items.map((v, ind) => <GameItem key={ind} image={v.image} title={v.title} link={v.link} detail={v.detail} /> )}
      </div>
    </Container>
  </Layout>
);

const Container = styled.div`
  & {
    padding-top: 8px;
  }
  h1 {
    margin-left: 16px;
    margin-top: 16px;
  }
  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ItemContainer = styled.div`
  & {
    user-select: none;
    width: 360px;
    height: 300px;
    padding: 16px;
    box-sizing: border-box;
    margin: 16px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #FFF;
    box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.38);
  }
  .image {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    padding: auto;
    max-height: 200px;
    max-width: 100%;
  }
  h2 {
    margin: 12px 0 8px 0;
  }
`;

export default Main;