# Blog Post Viewer

A modern, responsive React application built with Next.js that allows users to browse, view, and like blog posts. The application fetches data from the DummyJSON API and provides a clean, intuitive interface for reading blog content.

## Features

### Core Features
- **Browse Blog Posts**: View a grid of blog posts with titles, excerpts, and author information
- **Post Detail View**: Click on any post to view the full content on a dedicated page
- **Like/Favorite System**: Like posts with data persisted in localStorage
- **Author Information**: Display detailed author profiles with each post
- **Responsive Design**: Optimized for both desktop and mobile devices

### Bonus Features
- **Search Functionality**: Search posts by title or content
- **Pagination**: Navigate through posts with pagination controls
- **TypeScript**: Full TypeScript implementation for type safety
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Graceful error handling for API failures

## Getting Started

First, clone the project :
```bash
git clone https://github.com/mohamedelbachir/makiti-react-test
```
Then install dependency :

```bash
npm i --legacy-peer-deps
```

After run developpement server :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: DummyJSON (posts and users)
- **Storage**: localStorage for liked posts

## API Integration

The application integrates with the DummyJSON API:
- **Posts**: `https://dummyjson.com/posts` - Fetches blog posts
- **Users**: `https://dummyjson.com/users` - Fetches author information
- **Individual Post**: `https://dummyjson.com/posts/{id}` - Fetches specific post
- **Individual User**: `https://dummyjson.com/users/{id}` - Fetches specific user

## Approach

### Architecture Decisions
1. **Next.js App Router**: Utilized for modern routing and better performance
2. **Component-Based Architecture**: Separated concerns with reusable components
3. **TypeScript**: Implemented for type safety and better developer experience
4. **Client-Side Rendering**: Used for dynamic interactions like search and likes
5. **localStorage**: Chosen for persistence without requiring a backend

### Data Flow
1. **Initial Load**: Fetch all posts and users simultaneously using Promise.all
2. **Search**: Filter posts client-side for instant results
3. **Pagination**: Implement client-side pagination for better performance
4. **Likes**: Store in localStorage and sync with UI state
5. **Navigation**: Use Next.js routing for seamless page transitions

### UI/UX Considerations
- **Responsive Grid**: Adapts from 1 column on mobile to 3 columns on desktop
- **Loading States**: Skeleton loading for better perceived performance
- **Visual Hierarchy**: Clear typography and spacing for readability
- **Interactive Elements**: Hover effects and visual feedback for user actions

## Bonus Features Implemented

[x] **Search/Filter**: Real-time search by title or content  
[x] **Pagination**: Navigate through posts with page controls  
[x] **TypeScript**: Full TypeScript implementation  
[x] **Responsive Design**: Mobile-first responsive layout  
[x] **Loading States**: Smooth loading indicators  
[x] **Error Handling**: Graceful error handling and user feedback  

