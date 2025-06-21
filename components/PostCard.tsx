/* eslint-disable react/jsx-no-comment-textnodes */
import { UserAvatar } from './UserAvatar';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { getLikedPosts, toggleLike } from "@/lib/localStorage"

interface PostCardProps {
  post: {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
  };
  handleLike?: () => void;
}

export function PostCard({ post, handleLike: propHandleLike }: PostCardProps) {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    setLikedPosts(getLikedPosts());
  }, [post]);

  const internalHandleLike = (postId: number) => {
    const newLikedPosts = toggleLike(postId);
    setLikedPosts(newLikedPosts);
  };

  const isLiked = likedPosts.includes(post.id);

  return (
    <div className="relative">
      <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
        <div className="h-full w-full transition duration-300 group-hover:scale-105">
          <img
            src={"https://dummyjson.com/image/400x200"}
            alt={post.title}
            className="max-sm:aspect-6/3 aspect-5/3 h-full w-full object-cover object-center"
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (propHandleLike) {
            propHandleLike();
          } else {
            internalHandleLike(post.id);
          }
        }}
        className={`p-1 h-8 w-8 absolute top-3 right-3 ${isLiked ? "text-red-500" : "text-gray-400"}`}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
      </Button>
      <div className="flex gap-2">
        {post.tags.map((l, index) => <Badge key={index} className="text-xs">{l}</Badge>)}
      </div>
      <Link href={"/post/" + post.id} className="relative group flex flex-col">
        <div className="hover:underline mb-2 line-clamp-1 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-xl">
          {post.title}
        </div>
      </Link>
      <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
        {post.body}
      </div>
      <div className="flex items-center gap-2">
        <UserAvatar userId={post.userId} />
      </div>
    </div>
  );
}