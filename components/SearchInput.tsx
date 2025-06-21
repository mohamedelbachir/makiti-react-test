import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialSearchQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(initialSearchQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 500); 
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchQuery) {
      params.set('q', debouncedSearchQuery);
      if(initialSearchQuery&&initialSearchQuery!==debouncedSearchQuery){
        params.delete('page'); 
      }
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchQuery, initialSearchQuery, pathname, router, searchParams]); 

  return (
    <Input
      type="text"
      placeholder="Search posts by title or content..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full"
    />
  );
}