import { Ban, X } from "lucide-react";
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ban"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
export default function ErrorMessage({message, onClose}){
      return(
        <div className={`${!message ? 'hidden' : 'flex' } min-w-1/4 absolute top-16 left-1/2 transform -translate-x-1/2 items-center justify-between p-4 rounded-3xl shadow-2xl bg-[#ECC8C5]`}>
            <div className="flex gap-x-4">
                <div className="flex items-center justify-center bg-[#FC4849] rounded-full px-3">
                    <Ban className="text-white" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-TitleGray">ERRO:</h1>
                    <p className="text-WeakGray">{message}</p>
                </div>
            </div>
            <X onClick={onClose} className="cursor-pointer text-[#FC4849]"/>
            
        </div>
    )
}