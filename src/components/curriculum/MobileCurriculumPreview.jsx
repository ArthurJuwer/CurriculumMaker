"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, FileText, X } from "lucide-react";
import Curriculum from "./Curriculum";

export default function MobileCurriculumPreview({ withPlaceholders = false, isFinal = false }) {
  const [open, setOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    const sheetHeight = sheetRef.current?.offsetHeight || 600;
    if (dragOffset > sheetHeight * 0.25) {
      setOpen(false);
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartY.current = null;
  };

  const miniCurriculumProps = isFinal
    ? { isLast: true }
    : { isLast: true, withPlaceholders: true };

  const sheetCurriculumProps = isFinal ? { isLast: true } : { withPlaceholders: true };

  return (
    <>
      {/* Mini Curriculum Peek */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label="Abrir pré-visualização do currículo"
        className={`xl:hidden fixed z-30 bottom-[5.25rem] right-4 group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? "opacity-0 scale-90 translate-y-6 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <span className="absolute -inset-2 rounded-2xl bg-StrongGray/10 blur-xl" />
        <div className="relative w-[108px] h-[152px] rounded-xl bg-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-black/5 overflow-hidden -rotate-3 group-active:scale-95 group-active:-rotate-1 transition-transform duration-200">
          <div
            className="absolute top-0 left-0 pointer-events-none select-none"
            style={{
              width: "440px",
              height: "620px",
              transform: "scale(0.2455)",
              transformOrigin: "top left",
            }}
            aria-hidden="true"
          >
            <Curriculum {...miniCurriculumProps} />
          </div>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/85 backdrop-blur-sm text-[9px] font-semibold text-StrongGray tracking-wide shadow-sm">
            Toque para ver
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Pré-visualizar currículo"
        aria-expanded={open}
        className={`xl:hidden fixed z-30 bottom-5 right-4 group transition-all duration-300 ease-out ${
          open
            ? "opacity-0 scale-75 pointer-events-none translate-y-4"
            : "opacity-100 scale-100"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-TitleGray/30 animate-ping [animation-duration:2.4s]" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-TitleGray to-StrongGray blur-md opacity-50" />
        <div className="relative flex items-center gap-2.5 bg-gradient-to-br from-TitleGray to-StrongGray text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-StrongGray/40 ring-1 ring-white/10 active:scale-95 group-hover:scale-105 transition-transform duration-200">
          <span className="relative">
            <FileText size={20} strokeWidth={1.75} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-DefaultOrange ring-2 ring-StrongGray" />
          </span>
          <span className="text-sm font-medium tracking-wide">Currículo</span>
        </div>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`xl:hidden fixed inset-0 z-40 bg-StrongGray/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Pré-visualização do currículo"
        style={{
          transform: open ? `translateY(${dragOffset}px)` : "translateY(100%)",
          transition: isDragging ? "none" : "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        className="xl:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] max-h-[92dvh] flex flex-col"
      >
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="mx-auto w-11 h-1.5 bg-NormalGray/60 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 pt-2 pb-3 border-b border-WeakLightGray/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-TitleGray to-StrongGray flex items-center justify-center shadow-md">
              <Eye size={18} className="text-white" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-StrongGray leading-tight">
                Pré-visualização
              </h3>
              <p className="text-xs text-WeakGray leading-tight mt-0.5">
                Arraste para baixo para fechar
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar pré-visualização"
            className="w-9 h-9 rounded-full bg-DefaultGray/60 hover:bg-DefaultGray active:scale-90 flex items-center justify-center transition-all"
          >
            <X size={18} className="text-TitleGray" strokeWidth={2} />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 bg-gradient-to-b from-DefaultGray/30 to-transparent
            [&_.text-title1920]:!text-xl
            [&_.text-subtitle1920]:!text-lg
            [&_.text-p1920]:!text-[11px]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-NormalGray/50"
        >
          <Curriculum {...sheetCurriculumProps} />
        </div>
      </div>
    </>
  );
}
