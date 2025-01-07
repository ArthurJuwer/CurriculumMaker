import { Award, Trash } from "lucide-react";

export default function FormationCertifications({ title, onDelete, id }) {
    return (
        <div className="2xl:w-full w-1/2 bg-[#EA8C1A] p-2 border-2 border-black relative">
            <div className="bg-[#DBD0C1] border-2 border-black p-5 relative">
                <div className="flex items-center gap-x-2">
                    <Award className="w-2/12 h-auto" />
                    <p className="w-10/12 text-xs font-medium">{title}</p>
                </div>
                
                {onDelete && (
                    <button
                        onClick={() => onDelete(id)}
                        className="absolute -top-6 -right-5 p-1 bg-red-600 text-white rounded-full"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
