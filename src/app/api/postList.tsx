import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

interface IPostList {
  id: string;
  title: string;
  thumb: string;
  website: string;
  period: {
    start: string;
    end: string;
  };
  skills: string;
  type: string;
}

const PostList: FC<IPostList> = ({
  id,
  title,
  thumb,
  website,
  period,
  skills,
}) => {
  return (
    <li className="list__li" key={id}>
      <Link
        href={`${website}`}
        title={`${title} 자세히 보기`}
        target="_blank"
        aria-label={`${title} 프로젝트 자세히보기`}
      >
        <div className="list__thumb">
          <Image src={thumb} alt={`${title} 썸네일`} width={500} height={500} />
        </div>
        <div className="list__info">
          <div className="list__title">
            <p>{title}</p>
          </div>
          <div className="list__period">
            <p className="period__start">{`${period.start}`}</p>
            {"~"}
            <p className="period__end">{`${period.end}`}</p>
          </div>
          <div className="list__skills">
            <p>{skills}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PostList;
