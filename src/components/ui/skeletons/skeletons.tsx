// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export  function StockSkeleton() {
    return (
        <div
          className={`${shimmer} relative mb-4 h-8 w-24 overflow-hidden rounded-md bg-neutral-200`}
        />
    );
  }
  