import Hero from "./components/Hero";
import Posts from "./components/Posts";
import { fetchPosts, fetchPostsById } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const result = await fetchPosts({ page: page ? +page : undefined });

  if ("error" in result) {
    throw new Error(result.error);
  }

  const { posts, totalPosts } = result;

  const featuredPost = await fetchPostsById(320);
  if ("error" in featuredPost) {
    return <p>Error occurred loading featured post</p>;
  }

  const session = await getSession();

  return (
    <main>
      <Hero />
      <Posts
        featuredPost={featuredPost}
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
