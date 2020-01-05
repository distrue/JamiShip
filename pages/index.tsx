import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from '../components/Layout';
import { GameDisplay as items } from '../games/gameList';
import { MdStar } from 'react-icons/md';

interface GameItemProps {
  image: string;
  title: string;
  detail: string;
  link: string;
  rating?: number;
}

const Banner = () => (
  <BannerContainer>
    <h1>JamiShipJS</h1>
    <span>재미있고 쉬운 자바스크립트 코딩</span>
  </BannerContainer>
);

const BannerContainer = styled.div`
  & {
    position: absolute;
    left: 0;
    top: 60px;
    width: 100vw;
    height: 360px;
    background-image: url("https://miro.medium.com/max/3000/0*3Bju1yQhxUn2dWkf.jpg");
    background-size: fit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    & > h1 {
      font-size: 72px;
      color: #FFF;
      margin: 16px 0;
    }
    & > span {
      font-size: 36px;
      color: #FFF;
    }
  }
`;

const GameItem = (props: GameItemProps) => {
  const {link, image, title, detail, rating} = props;
  const stars = [];
  for(let i=0; i<(rating ?? 3);i++) {
    stars.push(<MdStar key={i} />);
  }
  return (
    <ItemContainer>
      <Link href={link}>
        <div>
          <div className="image">
            <img src={image} alt={title} />
          </div>
          <h2>{title}</h2>
          <div>{detail}</div>
          <div className="stars">{stars}</div>
        </div>
      </Link>
    </ItemContainer>
  );
};

// const items: GameItemProps[] = [
//   { image: 'http://img2.sbs.co.kr/img/sbs_cms/CH/2017/03/14/CH33548709_w666_h968.jpg', title: '손병호게임', link: '/learn/son', detail: '술게임으로 배우는 자바스크립트' },
//   { image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/learn/son', detail: '뭔가 보여드리겠습니다' },
//   { image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/learn/son', detail: '뭔가 보여드리겠습니다' },
//   { image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', title: 'asdf', link: '/learn/son', detail: '뭔가 보여드리겠습니다' },
//   { image: 'https://www.miracle-recreation.com/content/uploads/2018/11/Image-Header_Park.jpg', title: '플레이그라운드', link: '/learn/playground', detail: '아무거나 하세요' },
// ];

const Main = () => (
  <Layout>
    <>
      <Banner />
      <Container>
        <h1>학습 시작하기</h1>
        <div className="items">
          {items.map((v, ind) => <GameItem key={ind} image={v.image} title={v.title} link={`/learn/${v.id}`} detail={v.desc} rating={v.rating} />)}
        </div>
      </Container>
    </>
  </Layout>
);

const Container = styled.div`
  & {
    padding: 0;
    margin-top: 440px;
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
    height: 340px;
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
  .stars {
    margin-top: 8px;
  }
`;

export default Main;
