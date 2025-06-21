import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PostCardSkeleton() {
  return (
    <Card className="w-full h-full flex flex-col animate-pulse">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <div className="h-5 bg-gray-300 rounded-full w-16"></div>
            <div className="h-5 bg-gray-300 rounded-full w-20"></div>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </CardContent>

    </Card>
  )
}
