export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  age: number
  university: string
  company: {
    name: string
    department: string
    title: string
  }
  address: {
    address: string
    city: string
    state: string
    country: string
  }
}

interface PaginatedPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

interface PaginatedUsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
