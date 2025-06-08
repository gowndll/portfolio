"use client";

import { useSearchParams } from "next/navigation";
import PostList from "./postList";
import { NotionResults } from "@/app/api/IPost";

interface PostsProps {
  posts: NotionResults;
}

const Posts = ({ posts }: PostsProps) => {
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");

  // 필터링된 포스트만 추출
  const filteredPosts = posts.filter((post) => {
    const type = post.properties.type?.select?.name ?? "";
    return !queryType || type === queryType;
  });

  return (
    <article className="list max-w">
      <header className="visuallyhidden">
        <h2>프로젝트 리스트</h2>
      </header>

      {filteredPosts.length === 0 ? (
        <div className="nodata">
          <i className="ri-close-circle-line"></i>
          <p>데이터가 없습니다</p>
        </div>
      ) : (
        <ul className="list__ul">
          {posts?.map((post) => {
            const title = post.properties.name?.title?.[0]?.plain_text ?? "";
            const thumb = post.properties.thumb?.files?.[0]?.file?.url ?? "";
            const website = post.properties.website?.url ?? "";
            const period = post.properties.period?.date ?? "";
            const skills =
              post.properties.skills?.rich_text?.[0]?.plain_text ?? "";
            const type = post.properties.type?.select?.name ?? "";
            if (!queryType || type === queryType) {
              return (
                <PostList
                  key={post.id}
                  id={post.id}
                  title={title}
                  thumb={thumb}
                  website={website}
                  period={period}
                  skills={skills}
                  type={type}
                />
              );
            }
          })}
        </ul>
      )}
    </article>
  );
};

export default Posts;
