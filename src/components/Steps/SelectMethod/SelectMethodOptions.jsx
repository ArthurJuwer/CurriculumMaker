export default function SelectMethodOptions({title, text, icon, onClick, select}){
    return(
        <div 
            className={`w-1/2 h-full bg-transparent cursor-pointer  ${select ? 'border-2 border-[#FF6D05]' : 'border border-BorderInputGray'}   p-10 flex items-center gap-x-8 rounded-2xl`}
            onClick={onClick}    
        >
            
                <div className="h-full w-1/3">
                    <div className="h-full w-full bg-[#FFCF8C] flex items-center justify-center text-[#FF6D05]">
                        {icon}
                    </div>
                    
                </div>
                <div className="flex flex-col gap-y-6 text-left w-2/3">
                    <h1 className="text-TitleGray text-2xl font-semibold">{title}</h1>
                    <p className="text-WeakGray text-sm">{text}</p>
                </div>
        </div>
    )
}