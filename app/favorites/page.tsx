"use client"

import { useState, useEffect } from "react"
import { Heart, Book, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Post } from "@/lib/api"
import { fetchPost, fetchUser } from "@/lib/api"
import { getLikedPosts, toggleLike } from "@/lib/localStorage"
import PostCardSkeleton from "@/components/PostCardSkeleton"
import { PostCard } from '@/components/PostCard';

export default function FavoritesPage() {
  const router = useRouter()
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([])
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const likedPostIds = getLikedPosts()
    setLikedPosts(likedPostIds)

    if (likedPostIds.length > 0) {
      loadFavoritePosts(likedPostIds)
    } else {
      setLoading(false)
    }
  }, [])

  const loadFavoritePosts = async (likedPostIds: number[]) => {
    setLoading(true)
    try {
      const postPromises = likedPostIds.map((postId) => fetchPost(postId))
      const posts = await Promise.all(postPromises)
      setFavoritePosts(posts.filter(Boolean) as Post[])
    } catch (error) {
      console.error("Error loading favorite posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = (postId: number) => {
    const newLikedPosts = toggleLike(postId)
    setLikedPosts(newLikedPosts)

    if (!newLikedPosts.includes(postId)) {
      setFavoritePosts((prev) => prev.filter((post) => post.id !== postId))
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button onClick={handleBack} variant="ghost" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Your Favorites
                </h1>
                <p className="text-gray-600 mt-1 text-xs">
                  {likedPosts.length} post{likedPosts.length !== 1 ? "s" : ""} you've liked
                </p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="bg-white items-center justify-center flex text-gray-700 hover:bg-gray-50">
                <Book className="h-4 w-4 text-gray-300" />
                <span className="max-sm:hidden">Browse All Posts</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: Math.min(likedPosts.length, 6) }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : likedPosts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring and liking posts to build your personal collection of favorite articles.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Discover Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePosts.map((post) => {
              return (
                <PostCard key={post.id} post={post} handleLike={() => handleLike(post.id)} />
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}