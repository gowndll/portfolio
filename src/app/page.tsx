import { Fragment } from "react";
import Header from "./Header";
import "./globals.css";
import "./styles/style.scss";
import "remixicon/fonts/remixicon.css";
import { getDatabase } from "@/lib/notion";
import Posts from "./api/posts";
import { NotionResults } from "./api/IPost";

export default async function Home() {
  const posts: NotionResults = await getDatabase();

  return (
    <Fragment>
      <Header />
      <main>
        <Posts posts={posts} />
      </main>
    </Fragment>
  );
}
