'use client';

import '../styles/story.scss';
import Image from 'next/image';

const Story = ({}) => {
  return (
    <div className="modal-contents">
      <header className="modal-header">
        <nav className="modal-header-nav">
          <ul className="progress">
            <li className="progress__bar"></li>
            <li className="progress__bar"></li>
          </ul>
        </nav>
        <div className="user">
          <div className="user__profile">
            <Image
              src={'/img/profile.png'}
              alt="노션으로 만든 프로필 사진"
              width={32}
              height={32}
            />
          </div>
          <h2 className="user__name">
            Haeju <span className="visuallyhidden">의 자기소개</span>
          </h2>
        </div>
        <div className="controller">
          <button type="button" className="controller__pause">
            <i className="ri-pause-fill"></i>
          </button>
        </div>
      </header>
      <div className="main"></div>
      <footer className="footer">
        <div className="message">
          <input type="text" placeholder={'Haeju님에게 답장하기...'} readOnly />
        </div>
        <div className="btns">
          <button type="button" className="btn__like">
            <i className="ri-heart-line"></i>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Story;
