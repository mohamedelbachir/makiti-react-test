// components/PaginationControls.tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface PaginationControlsProps {
  totalItems: number;
  itemsPerPage: number;
}

export function PaginationControls({ totalItems, itemsPerPage }: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString()); 
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };


  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 1; 

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink href={createPageURL(1)}>1</PaginationLink>
          </PaginationItem>
        );
        if (startPage > 2) {
          items.push(<PaginationEllipsis key="start-ellipsis" />);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(<PaginationEllipsis key="end-ellipsis" />);
        }
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href={createPageURL(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return (

    <>
    {currentPage<=totalPages&&
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'} />
            </PaginationItem>
            {getPaginationItems()}
            <PaginationItem>
              <PaginationNext href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </div>
  }</>
  );
}