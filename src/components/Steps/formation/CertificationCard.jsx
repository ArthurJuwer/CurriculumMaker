import { Award, Trash } from "lucide-react";

export default function CertificationCard({ title, onDelete, id }) {
  const indexLabel =
    typeof id === "number" ? String(id + 1).padStart(2, "0") : null;

  return (
    <div className="2xl:w-full w-1/2 bg-[#EA8C1A] p-2 border-2 border-black relative group/cert">
      <div
        className="bg-[#DBD0C1] border-2 border-black relative shadow-[3px_3px_0_0_#000]
          transition-[transform,box-shadow] duration-150 ease-out
          group-hover/cert:-translate-x-0.5 group-hover/cert:-translate-y-0.5
          group-hover/cert:shadow-[5px_5px_0_0_#000]"
      >
        <div className="flex items-center justify-between px-2.5 pt-2 pb-1 border-b border-black/15">
          <div className="flex items-center gap-x-1.5">
            <span className="w-1 h-1 bg-black rounded-full" />
            <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/55 leading-none">
              Certificado
            </span>
          </div>
          {indexLabel && (
            <span className="font-mono text-[8px] font-bold text-black/35 tabular-nums leading-none">
              N°{indexLabel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-x-2.5 px-2.5 py-2.5">
          <div
            className="shrink-0 w-8 h-8 bg-[#EA8C1A] border-2 border-black flex items-center justify-center
              transition-transform duration-150 group-hover/cert:rotate-[-4deg]"
          >
            <Award className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <p
            className="flex-1 min-w-0 text-xs font-semibold text-black leading-snug
              [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden"
            title={title}
          >
            {title}
          </p>
        </div>
      </div>

      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(id)}
          aria-label="Remover certificação"
          className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-red-600 border-2 border-black rounded-full
            flex items-center justify-center text-white shadow-[2px_2px_0_0_#000]
            opacity-0 group-hover/cert:opacity-100 focus-visible:opacity-100
            transition-[opacity,transform,background-color] duration-150
            hover:bg-red-700 hover:scale-110
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#EA8C1A]"
        >
          <Trash className="w-3 h-3" strokeWidth={2.75} />
        </button>
      )}
    </div>
  );
}
