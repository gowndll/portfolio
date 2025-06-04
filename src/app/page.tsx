import { Fragment } from "react";
import "./globals.css";
import Header from "./Header";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main>
        <div>
          <p>main입니다</p>
        </div>
      </main>
    </Fragment>
  );
}
