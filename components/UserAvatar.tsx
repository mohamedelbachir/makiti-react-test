import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUser } from '@/lib/api';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';

interface UserAvatarProps {
  userId: number;
}

export function UserAvatar({ userId }: UserAvatarProps) {
  const { data: user, error } = useSWR(`/users/${userId}`, () => fetchUser(userId));

  if (error) {
    return <span className="text-red-500">Error loading user</span>;
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    );
  }

  const fallback = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="font-medium">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
}