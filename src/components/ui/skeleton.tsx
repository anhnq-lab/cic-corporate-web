import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/70", className)}
      {...props}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 overflow-hidden bg-card",
        className
      )}
    >
      {/* Thumbnail */}
      <Skeleton className="w-full aspect-[16/10] rounded-none" />

      <div className="p-5 space-y-3">
        {/* Badge */}
        <Skeleton className="h-5 w-16 rounded-full" />

        {/* Title */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// News Card Skeleton
export function NewsCardSkeleton({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 overflow-hidden bg-card",
        className
      )}
    >
      {/* Thumbnail */}
      <Skeleton className="w-full aspect-[16/9] rounded-none" />

      <div className="p-5 space-y-3">
        {/* Category */}
        <Skeleton className="h-4 w-20" />

        {/* Title */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />

        {/* Excerpt */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        {/* Meta */}
        <div className="pt-3 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

// Detail Page Skeleton
export function DetailPageSkeleton() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Back button */}
      <Skeleton className="h-8 w-24" />

      {/* Hero Image */}
      <Skeleton className="w-full aspect-[21/9] rounded-2xl" />

      {/* Title */}
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-10 w-1/2" />

      {/* Meta */}
      <div className="flex gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Images in content */}
      <Skeleton className="w-full aspect-[16/9] rounded-xl" />

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-12 w-24 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}
