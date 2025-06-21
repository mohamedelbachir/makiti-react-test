"use client"
import { fetchPosts } from '@/lib/api';
import { PostCard } from '@/components/PostCard';
import { PaginationControls } from '@/components/PaginationControls';
import { SearchInput } from '@/components/SearchInput';
import { useSearchParams } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {Star} from "lucide-react"
import Link from "next/link"
import PostCardSkeleton from "@/components/PostCardSkeleton"
import useSWR from 'swr';


const POSTS_PER_PAGE = 8;


const Page = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('q') || '';

  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const { data, error } = useSWR(
    [`/posts`, POSTS_PER_PAGE, skip, searchQuery],
    () => fetchPosts(POSTS_PER_PAGE, skip, searchQuery)
  );

  const posts = data?.posts || [];
  const totalPosts = data?.total || 0;

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <Badge variant="secondary" className="mt-6">
            Latest update
          </Badge>
          <div className="flex mt-3 items-center justify-between">
            <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-5xl">
               Blog
            </h1>
            <div className="max-md:hidden md:w-2/3 w-1/2 flex gap-2 items-center">
              <SearchInput />
              <Button asChild>
                <Link className="flex items-center" href="/favorites">
                  <Star className="mr-2 h-4 w-4" />
                  Favorites
                </Link>
              </Button>
            </div>
          </div>
          <p>Discover the latest trends, tips, and best practices in modern web development.</p>
          <div className="hidden max-md:flex flex-col w-full gap-3 mt-3 items-center">
              <SearchInput />
              <Button className="w-full" asChild>
                <Link href="/favorites">
                  <Star className="mr-2 h-4 w-4" />
                  Favorites
                </Link>
              </Button>
          </div>
          <Separator className="mt-5"/>
        </div>
        {error&&<div className="text-center text-red-500 py-8">Failed to load posts. Please try again later.</div>}
        {!error&&data ? (
          <>
            {posts.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No posts found for your search query.
              </div>
            )}
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12 lg:grid-cols-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-8">
              <PaginationControls totalItems={totalPosts} itemsPerPage={POSTS_PER_PAGE} />
            </div>
          </>
        ) : (
          <>{!error&&<LoadingState />}</>
        )}
      </div>
    </section>
  );
};

export default Page

function LoadingState() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12 lg:grid-cols-4">
        {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
          <PostCardSkeleton key={i}/>
        ))}
      </div>
    </div>
  );
}