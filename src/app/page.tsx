import { Fragment, Suspense } from 'react';
import { getDatabase } from '@/lib/notion';
import 'remixicon/fonts/remixicon.css';
import './globals.css';
import './styles/style.scss';
import './styles/posts.scss';
import { NotionResults } from './api/IPost';
import Header from './component/Header';
import Posts from './api/posts';
import Loading from './component/Loading';
import Footer from './Footer';

export default async function Home() {
  const posts: NotionResults = await getDatabase();

  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Header />
        <main>
          <Posts posts={posts} />
        </main>
        <Footer />
      </Suspense>
    </Fragment>
  );
}
