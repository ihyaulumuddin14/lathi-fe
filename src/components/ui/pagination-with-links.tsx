"use client";

import { type ReactNode, useCallback, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";


type PaginationQueryParams = {
  page: string;
  limit: string;
};

export interface PaginationWithLinksProps {
  totalCount: number;
  page: number;
  limit: number;

  queryParams?: PaginationQueryParams;
  navigationMode?: "link" | "router";
  limitOptions?: number[];
}


export function PaginationWithLinks({
  totalCount,
  page,
  limit,
  queryParams = {
    page: "page",
    limit: "limit",
  },
  navigationMode = "router",
  limitOptions = [10, 20, 50],
}: PaginationWithLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPageCount = Math.max(1, Math.ceil(totalCount / limit));

   /*
     url Maker
   */
  const buildUrl = useCallback(
    (newPage: number, newLimit = limit) => {
      const params = new URLSearchParams(searchParams ?? undefined);

      params.set(queryParams.page, String(newPage));
      params.set(queryParams.limit, String(newLimit));

      return `${pathname}?${params.toString()}`;
    },
    [searchParams, pathname, limit, queryParams]
  );

   /*
     Navigation
   */
  const navigate = useCallback(
    (url: string) => {
      if (navigationMode === "router") {
        startTransition(() => router.push(url));
      } else {
        router.push(url);
      }
    },
    [router, navigationMode]
  );

   /*
     Page Change
   */
  const goToPage = (newPage: number) => {
    navigate(buildUrl(newPage));
  };

   /*
     Limit Change
   */
  const changeLimit = (newLimit: number) => {
    // reset page to 1 when limit changes
    navigate(buildUrl(1, newLimit));
  };

   /*
     Page Number
   */
  const renderPages = () => {
    const items: ReactNode[] = [];
    const maxVisible = 5;

    const createItem = (p: number) => (
      <PaginationItem key={p}>
        {navigationMode === "router" ? (
          <PaginationLink
            onClick={() => goToPage(p)}
            isActive={page === p}
            className={cn(
              "cursor-pointer",
              isPending && "pointer-events-none opacity-50"
            )}
            aria-disabled={isPending}
          >
            {p}
          </PaginationLink>
        ) : (
          <PaginationLink
            href={buildUrl(p)}
            isActive={page === p}
          >
            {p}
          </PaginationLink>
        )}
      </PaginationItem>
    );

    if (totalPageCount <= maxVisible) {
      for (let i = 1; i <= totalPageCount; i++) items.push(createItem(i));
    } else {
      items.push(createItem(1));

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) items.push(createItem(i));

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(createItem(totalPageCount));
    }

    return items;
  };

   /*
     Render
   */
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {/* LIMIT SELECT */}
      <div className="flex items-center gap-3 flex-1">
        <span className="text-sm whitespace-nowrap">Rows per page</span>
        <Select value={String(limit)} onValueChange={(v) => changeLimit(+v)}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {limitOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* PAGINATION */}
      <Pagination className="md:justify-end">
        <PaginationContent>
          {isPending && (
            <PaginationItem>
              <Loader2 className="h-4 w-4 animate-spin" />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(Math.max(1, page - 1))}
              aria-disabled={page === 1 || isPending}
              className={cn(
                page === 1 || isPending
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              )}
            />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(Math.min(totalPageCount, page + 1))}
              aria-disabled={page === totalPageCount || isPending}
              className={cn(
                page === totalPageCount || isPending
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
