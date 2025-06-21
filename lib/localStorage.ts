const LIKED_POSTS_KEY = "likedPosts"

export function getLikedPosts(): number[] {
  if (typeof window === "undefined") return []

  try {
    const liked = localStorage.getItem(LIKED_POSTS_KEY)
    return liked ? JSON.parse(liked) : []
  } catch (error) {
    console.error("Error reading liked posts from localStorage:", error)
    return []
  }
}

export function toggleLike(postId: number): number[] {
  const likedPosts = getLikedPosts()
  const isLiked = likedPosts.includes(postId)

  let newLikedPosts: number[]
  if (isLiked) {
    newLikedPosts = likedPosts.filter((id) => id !== postId)
  } else {
    newLikedPosts = [...likedPosts, postId]
  }

  try {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(newLikedPosts))
  } catch (error) {
    console.error("Error saving liked posts to localStorage:", error)
  }

  return newLikedPosts
}

export function isPostLiked(postId: number): boolean {
  return getLikedPosts().includes(postId)
}
