import { ChevronDownIcon } from "lucide-react";

export default function FinalizationSelect({
  label,
  id,
  onChange,
  value,
  options,
  defaultValue,
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-y-4 relative">
      <label
        htmlFor={id}
        className={`uppercase font-semibold ${
          disabled ? "text-WeakGray" : "text-TitleGray"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          className={`appearance-none border w-full border-BorderInputGray bg-transparent 2xl:p-4 p-3 pr-10 rounded-xl ${
            disabled ? "opacity-60 cursor-not-allowed text-WeakGray" : ""
          }`}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        >
          {options?.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
            disabled ? "text-WeakLightGray" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  );
}
