export default function SelectMethodCard({ title, text, icon, onClick, select }) {
  return (
    <div
      className={`w-full h-full bg-transparent cursor-pointer border-2 ${
        select ? "border-[#FF6D05]" : "border-BorderInputGray"
      } lg:p-10 p-4 py-6 flex flex-row items-center gap-x-4 lg:gap-x-8 rounded-2xl`}
      onClick={onClick}
    >
      <div className="h-24 w-1/3 lg:h-full shrink-0">
        <div className="h-full w-full bg-[#FFCF8C] flex items-center justify-center text-[#FF6D05]">
          {icon}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 lg:gap-y-6 text-left flex-1">
        <h1 className="text-TitleGray lg:text-2xl text-base text-left font-semibold">
          {title}
        </h1>
        <p className="text-WeakGray lg:text-sm text-xs">{text}</p>
      </div>
    </div>
  );
}
