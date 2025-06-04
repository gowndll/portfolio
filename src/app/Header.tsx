import Link from "next/link";
import { Fragment } from "react";
import "./styles/variables.scss";

const Header = () => {
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
          <div className="profile__img"></div>
        </div>
        <div className="profile__right">
          <div className="profile__name">김해주</div>
          <dl className="profile__info">
            <dt className="profile__info__tit">Born</dt>
            <dd className="profile__info__desc">1997.06.26</dd>
            <dt className="profile__info__tit">Edu</dt>
            <dd className="profile__info__desc">
              <span>2016 ~ 2021</span>한국공학대(전 한국산업기술대) 융합디자인과
            </dd>
            <dt className="profile__info__tit">Career</dt>
            <dd className="profile__info__desc">
              <span>2021.03</span>DESIGNV.I.I
            </dd>
          </dl>
          <div className="profile__extra">
            <p>
              다양한 실무 경험과 지속적인 학습을 바탕으로,
              <br />웹 퍼블리셔로서의 역량을 확장하고 있는 김해주입니다.
            </p>
          </div>
        </div>
      </article>
      <article className="skill max-w" aria-label="skill">
        <ul className="skill__ul">
          <li className="skill__li">
            <div className="skill__img"></div>
            <p className="skill__txt">HTML/CSS</p>
          </li>
          <li className="skill__li">
            <div className="skill__img"></div>
            <p className="skill__txt">Javascript</p>
          </li>
          <li className="skill__li">
            <div className="skill__img"></div>
            <p className="skill__txt">Typescript</p>
          </li>
        </ul>
      </article>
      <nav className="nav">
        <ul className="nav__ul max-w">
          <li className="nav__li active">
            <Link href="/main">
              <i className="ri-layout-grid-line"></i>
              <span>PRODUCT</span>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/main">
              <i className="ri-cake-3-fill"></i>
              <span>TOY</span>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/main">??</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;
