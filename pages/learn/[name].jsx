import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const games = {
  son: '',
  playground: ''
}

export default function Learn() {
  const router = useRouter();
  const gameName = router.query.name;

  if (!Object.keys(games).includes(gameName)) {
    return (
      <Layout>
        <h1>그런 게임은 찾을 수 없습니다.</h1>
        <img src="/imgs/sad.png"></img>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <p>This is a learn page: {gameName}</p>
      </Layout>
    );
  }
}