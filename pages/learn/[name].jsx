import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Post() {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.name}</h1>
      <p>This is a learn page.</p>
    </Layout>
  );
}