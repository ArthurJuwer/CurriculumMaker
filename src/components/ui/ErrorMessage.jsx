import { Ban, X } from "lucide-react";

export default function ErrorMessage({ message, onClose }) {
  return (
    <div
      className={`${
        !message ? "hidden" : "flex"
      } xl:w-1/4 xl:min-w-1/4 w-11/12 absolute top-16 left-1/2 transform -translate-x-1/2 items-center justify-between p-4 rounded-3xl shadow-2xl bg-[#ECC8C5] z-50`}
    >
      <div className="flex gap-x-4">
        <div className="flex items-center justify-center bg-[#FC4849] rounded-full px-3">
          <Ban className="text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-TitleGray">ERRO:</h1>
          <p className="text-WeakGray">{message}</p>
        </div>
      </div>
      <X onClick={onClose} className="cursor-pointer text-[#FC4849]" />
    </div>
  );
}
