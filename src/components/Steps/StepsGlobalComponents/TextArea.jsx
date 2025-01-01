import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function TextArea({
  id,
  label,
  value,
  width,
  isLast,
  onChange,
  placeholder,
  validationError,
  isEmpty,
  onFocus,
}) {
  const [showContent, setShowContent] = useState(false); 
  const [isOnFocus, setIsOnFocus] = useState(null);
  const [lastFocus, setLastFocus] = useState(null); 

  const handleFocus = (e) => {
    if (onFocus) {
      onFocus(e);
    }
    setIsOnFocus(e.target.id);
  };

  const handleBlur = (e) => {
    setLastFocus(e.target.id);
    setIsOnFocus(null);
  };

  useEffect(() => {

    if (!validationError && !isEmpty) {
      if (isOnFocus) {

        const timer = setTimeout(() => {
          setShowContent(true);
        }, 1500);

        return () => clearTimeout(timer); 
      } else if (lastFocus) {
        
        setShowContent(true);
      } else {
        setShowContent(false); 
      }
    } else {
      setShowContent(false); 
    }
  }, [isOnFocus, lastFocus, validationError, isEmpty]);

  return (
    <div className={`relative ${width} h-40 ${isLast ? "last:w-full" : ""}`}>
      <label
        htmlFor={`input-${id}`}
        className="absolute bottom-[9.2rem] left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
      >
        {label}
      </label>

      <textarea
        type="text"
        id={`input-${id}`}
        className={`border w-full h-full ${
          value !== undefined && value !== ""
            ? "border-BorderInputGray outline-green-700"
            : "border-BorderInputGray"
        } bg-transparent p-4 rounded-xl z-10 resize-none`}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        maxLength={150}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {showContent && value !== undefined && value !== "" && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 size-8 rounded-full bg-green-700 flex justify-center items-center">
          <Check className="text-white size-6 mt-0.5 -rotate-2" />
        </div>
      )}
    </div>
  );
}
