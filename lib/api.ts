import type { Post, User,PaginatedPostsResponse,PaginatedUsersResponse,PostsResponse, UsersResponse } from "./types"


const BASE_URL = "https://dummyjson.com"

// export async function fetchPosts(): Promise<PostsResponse> {
//   const response = await fetch(`${BASE_URL}/posts?limit=30`)
//   if (!response.ok) {
//     throw new Error("Failed to fetch posts")
//   }
//   return response.json()
// }

export async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch post")
  }
  return response.json()
}

// export async function fetchUsers(): Promise<UsersResponse> {
//   const response = await fetch(`${BASE_URL}/users?limit=30`)
//   if (!response.ok) {
//     throw new Error("Failed to fetch users")
//   }
//   return response.json()
// }

// export async function fetchUser(id: number): Promise<User> {
//   const response = await fetch(`${BASE_URL}/users/${id}`)
//   if (!response.ok) {
//     throw new Error("Failed to fetch user")
//   }
//   return response.json()
// }


export async function fetchPosts(
  limit: number = 10,
  skip: number = 0,
  searchQuery: string = ''
): Promise<PaginatedPostsResponse> {
  let url = `${BASE_URL}/posts?limit=${limit}&skip=${skip}`;
  console.log(url)
  if (searchQuery) {
    url = `${BASE_URL}/posts/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export async function fetchUser(userId: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user with ID ${userId}`);
  }
  return res.json();
}

export async function fetchUsers(
  limit: number = 10,
  skip: number = 0
): Promise<PaginatedUsersResponse> {
  const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}