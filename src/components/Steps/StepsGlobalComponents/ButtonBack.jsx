import { ChevronLeft } from "lucide-react";

export default function ButtonBack(){
    return(
        <button 
            className="h-12 py-2 w-24 pl-4 bg-TitleGray text-white flex items-center justify-center rounded-3xl relative"
            onClick={()=> window.history.go(-1)}
            >
                <ChevronLeft className="absolute left-1"/>
                <h1>Voltar</h1>
        </button>
    )
}