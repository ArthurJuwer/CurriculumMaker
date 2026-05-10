import { AlertTriangle, X } from "lucide-react";

export default function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed lg:absolute top-0 lg:top-6 inset-x-0 z-50 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start text-center lg:text-left gap-3 w-full lg:w-auto lg:max-w-md lg:min-w-[380px] lg:mx-auto px-4 pt-5 pb-6 lg:p-4 lg:pr-3 rounded-none rounded-b-2xl lg:rounded-2xl bg-red-600 border-0 lg:border lg:border-red-700/40 shadow-[0_12px_32px_-8px_rgba(220,38,38,0.55),0_4px_12px_-4px_rgba(0,0,0,0.15)] animate-toastIn"
    >
      <div className="flex items-center justify-center shrink-0 size-14 lg:size-9 rounded-full bg-white/15 text-white">
        <AlertTriangle className="size-7 lg:size-[18px]" strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-1 lg:gap-0.5 flex-1 lg:pt-1 lg:pr-1 items-center lg:items-start">
        <h2 className="text-base lg:text-sm font-semibold text-white tracking-tight leading-tight">
          Não foi possível continuar
        </h2>
        <p className="text-sm text-red-50/90 leading-snug">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="lg:shrink-0 flex items-center justify-center h-9 px-4 lg:h-7 lg:w-7 lg:px-0 rounded-lg lg:rounded-full bg-white lg:bg-transparent text-red-600 lg:text-white/80 border border-white/80 lg:border-0 font-semibold text-sm hover:bg-red-50 lg:hover:bg-white/15 lg:hover:text-white transition-colors duration-200 gap-1.5"
      >
        <X className="size-4" strokeWidth={2.5} />
        <span className="lg:hidden">Fechar</span>
      </button>
    </div>
  );
}
