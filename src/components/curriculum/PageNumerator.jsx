import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PageNumerator({
  currentPage,
  setCurrentPage,
  hasSecondPage,
}) {
  const totalPages = hasSecondPage ? 2 : 1;
  const goPrev = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goNext = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

  return (
    <div
      className="absolute bottom-3 right-3 z-20 flex items-center gap-0.5
        bg-black/80 backdrop-blur-md text-white rounded-full p-0.5
        shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)] ring-1 ring-white/10
        select-none"
    >
      <button
        type="button"
        onClick={goPrev}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="w-6 h-6 flex items-center justify-center rounded-full
          transition-colors hover:bg-white/15
          disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>

      <span className="text-[10px] font-semibold tabular-nums px-1.5 min-w-[2rem] text-center leading-none">
        <span className="text-white">{currentPage}</span>
        <span className="text-white/40 mx-0.5">/</span>
        <span className="text-white/70">{totalPages}</span>
      </span>

      <button
        type="button"
        onClick={goNext}
        disabled={currentPage >= totalPages}
        aria-label="Próxima página"
        className="w-6 h-6 flex items-center justify-center rounded-full
          transition-colors hover:bg-white/15
          disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
