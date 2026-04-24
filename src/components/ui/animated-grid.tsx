export function AnimatedGridPattern() {
  return (
    <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)] pointer-events-none">
      <svg
        className="absolute inset-0 h-full w-full stroke-white/5"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`
        }}
      >
        <defs>
          <pattern
            id="grid"
            width={60}
            height={60}
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path
              d="M.5 60V.5H60"
              fill="none"
              strokeDasharray="4 2"
              className="animate-pulse"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid)" />
      </svg>
    </div>
  );
}
