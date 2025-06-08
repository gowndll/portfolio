import { Fragment, Suspense } from "react";
import { getDatabase } from "@/lib/notion";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import "./styles/style.scss";
import "./styles/posts.scss";
import { NotionResults } from "./api/IPost";
import Header from "./Header";
import Posts from "./api/posts";

export default async function Home() {
  const posts: NotionResults = await getDatabase();

  return (
    <Fragment>
      <Suspense fallback={""}>
        <Header />
      </Suspense>
      <main>
        <Suspense fallback={<p>로딩중..</p>}>
          <Posts posts={posts} />
        </Suspense>
      </main>
    </Fragment>
  );
}
