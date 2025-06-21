"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart,ThumbsDown , Eye, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Post, User as UserType } from "@/lib/types"
import { fetchPost, fetchUser } from "@/lib/api"
import { getLikedPosts, toggleLike } from "@/lib/localStorage"


export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = Number.parseInt(params.id as string)

  const [post, setPost] = useState<Post | null>(null)
  const [author, setAuthor] = useState<UserType | null>(null)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPostData = async () => {
      try {
        const postData = await fetchPost(postId)
        setPost(postData)

        const authorData = await fetchUser(postData.userId)
        setAuthor(authorData)

        setLikedPosts(getLikedPosts())
      } catch (err) {
        setError("Failed to load post")
        console.error("Error loading post:", err)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      loadPostData()
    }
  }, [postId])

  const handleLike = () => {
    if (post) {
      const newLikedPosts = toggleLike(post.id)
      setLikedPosts(newLikedPosts)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article>
            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-300 rounded-full w-16 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse"></div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="h-8 bg-gray-300 rounded w-full animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="flex gap-6 mb-6">
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded w-32 animate-pulse mb-8"></div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="h-20 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-64 animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-28 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        </main>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Post not found"}</p>
          <Button onClick={handleBack} variant="outline" className="bg-white text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const isLiked = likedPosts.includes(post.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button onClick={handleBack} variant="ghost" className="mb-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>


            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.reactions.likes} likes</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown  className="h-4 w-4" />
                <span>{post.reactions.dislikes} dislikes</span>
              </div>
            </div>

            <div className="mb-8">
              <Button
                onClick={handleLike}
                variant={isLiked ? "default" : "outline"}
                className={`${isLiked ? "bg-red-500 hover:bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like this post"}
              </Button>
            </div>
          </div>


          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{post.body}</p>
              </div>
            </CardContent>
          </Card>


          {author && (
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Author</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Avatar className="h-20 w-20 mx-auto sm:mx-0">
                    <AvatarImage
                      src={author.image || "/placeholder.svg"}
                      alt={`${author.firstName} ${author.lastName}`}
                    />
                    <AvatarFallback className="text-lg">
                      {author.firstName[0]}
                      {author.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {author.firstName} {author.lastName}
                    </h4>
                    <p className="text-gray-600 mb-3">{author.email}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                      <div>
                        <p>
                          <strong>Age:</strong> {author.age}
                        </p>
                        <p>
                          <strong>Phone:</strong> {author.phone}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>University:</strong> {author.university}
                        </p>
                        <p>
                          <strong>Company:</strong> {author.company.name}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="text-sm text-gray-500">
                      <p>
                        <strong>Address:</strong> {author.address.address}, {author.address.city},{" "}
                        {author.address.state}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </article>
      </main>
    </div>
  )
}
