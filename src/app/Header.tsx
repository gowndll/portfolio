"use client";

import Link from "next/link";
import { Fragment } from "react";
import "./styles/variables.scss";
import { useSearchParams } from "next/navigation";
import Skills from "./component/Skills";
import Image from "next/image";

const navList = [
  {
    title: "ALL",
    iconClass: "ri-layout-grid-line",
    type: null,
  },
  {
    title: "PRODUCT",
    iconClass: "ri-window-2-fill",
    type: "product",
  },
  {
    title: "TOY",
    iconClass: "ri-cake-3-fill",
    type: "toy",
  },
];

const Header = () => {
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");

  return (
    <Fragment>
      <header className="header">
        <div className="header__inner max-w">
          <div className="header__logo">
            <h1>
              <Link href="/">Instedgram</Link>
            </h1>
          </div>
        </div>
      </header>
      <article className="profile max-w" aria-label="profile">
        <div className="profile__left">
          <div className="profile__img">
            <Image
              src={"/img/profile.png"}
              alt="노션으로 만든 프로필 사진"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="profile__right">
          <div className="profile__name">김해주</div>
          <dl className="profile__info">
            <dt className="profile__info__tit">Birth</dt>
            <dd className="profile__info__desc">1997.06.26</dd>
            <dt className="profile__info__tit">Edu</dt>
            <dd className="profile__info__desc">
              <span>2016 ~ 2021</span>한국산업기술대 융합디자인과
            </dd>
            <dt className="profile__info__tit">Career</dt>
            <dd className="profile__info__desc">
              <span>2021.03 ~</span>DESIGNV.I.I
            </dd>
          </dl>
          <div className="profile__extra">
            <p>
              <i className="ri-double-quotes-l"></i>
              다양한 실무 경험과 지속적인 학습을 바탕으로,
              <br />웹 퍼블리셔로서의 역량을 확장하고 있는 김해주입니다.
              <i className="ri-double-quotes-r"></i>
            </p>
          </div>
        </div>
      </article>
      <article className="skill max-w" aria-label="skill">
        <Skills />
      </article>
      <nav className="nav">
        <ul className="nav__ul max-w">
          {navList?.map((item, index) => (
            <li
              className={`nav__li ${queryType === item.type ? "active" : ""}`}
              key={index}
            >
              <Link href={item.type === null ? "/" : `/?type=${item.type}`}>
                <i className={item.iconClass}></i>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;
