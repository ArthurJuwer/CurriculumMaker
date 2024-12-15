import { Award } from "lucide-react";

export default function FormationCertifications({title}){
    return(
        <div className="w-full bg-[#EA8C1A] p-2 border-2 border-black">
            <div className="bg-[#DBD0C1] border-2 border-black p-5">
                <div className="flex items-center gap-x-2">
                    <Award className="w-2/12 h-auto"/>
                    <p className="w-10/12 text-xs font-medium">{title}</p>
                </div>
                
            </div>
        </div>
    )
}