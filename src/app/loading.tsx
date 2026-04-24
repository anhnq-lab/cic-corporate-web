export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Shimmer loader */}
      <div className="w-full max-w-2xl space-y-6 animate-pulse">
        {/* Header shimmer */}
        <div className="space-y-3 text-center">
          <div className="h-4 w-32 bg-muted rounded-full mx-auto" />
          <div className="h-8 w-3/4 bg-muted rounded-lg mx-auto" />
          <div className="h-4 w-1/2 bg-muted rounded-full mx-auto" />
        </div>

        {/* Content shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border/30 rounded-2xl p-6 space-y-3"
            >
              <div className="h-10 w-10 bg-muted rounded-xl" />
              <div className="h-5 w-3/4 bg-muted rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded-full" />
                <div className="h-3 w-5/6 bg-muted rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
