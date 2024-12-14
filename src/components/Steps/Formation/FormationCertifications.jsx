import { Award } from "lucide-react";

export default function FormationCertifications(){
    return(
        <div className="w-full bg-[#EA8C1A] p-2 border-2 border-black">
            <div className="bg-[#DBD0C1] border-2 border-black px-2">
                <div className="flex items-center gap-x-2">
                    <Award className="h-20 w-20" />
                    <p className="text-xs font-medium">2º Edição do Hackathon Tech+Saúde do Senac São Leopoldo. </p>
                </div>
                
            </div>
        </div>
    )
}