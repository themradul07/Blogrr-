import Hero from "./components/Hero";
import Image from "next/image";
import Posts from "./components/Posts";
import { fetchPosts, fetchPostsById } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSession } from "@/lib/session";
import TestDialog from "./components/TestDailog";

type Props = {
  searchParams : Promise<{[key:string]: string| string[]| undefined}>;
}

export default async function Home({searchParams}: Props) {
  const {page} = await searchParams;
  
  const {posts, totalPosts} = await fetchPosts({
    page: page?+page:undefined,
  });

  const featuredPost = await fetchPostsById(320)

  const session = await getSession();


  return (
    <main>
      <Hero/>
      
      <Posts featuredPost={featuredPost} posts={posts} currentPage={page?+page:1} totalPages={Math.ceil(totalPosts/DEFAULT_PAGE_SIZE)} />
    </main>
  );
}
