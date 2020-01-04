import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/game/son', detail: '뭔가 보여드리겠습니다'},
  {image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg', title: '플레이그라운드', link: '/playground', detail: '아무거나 하세요'},
]

const Main = () => (
  <div>
    <Container>
      <h1>JamiShip</h1>
      <div className="items">
        {items.map((v, ind) => <GameItem key={ind} image={v.image} title={v.title} link={v.link} detail={v.detail} /> )}
      </div>
    </Container>
  </div>
);

const Container = styled.div`
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
    width: 100%;
    padding: auto;
  }
  h2 {
    margin: 12px 0 8px 0;
  }
`;

export default Main;