export default function SelectMethodOptions({title, text, icon, onClick, select}){
    return(
        <div 
            className={`h-full flex-col gap-y-2 lg:flex-row bg-transparent cursor-pointer  ${select ? 'border-2 border-[#FF6D05]' : 'border border-BorderInputGray'} lg:p-10 p-4 flex items-center gap-x-8 rounded-2xl`}
            onClick={onClick}    
        >
            
                <div className="h-32 w-full lg:h-full lg:w-1/3 ">
                    <div className="h-full w-full bg-[#FFCF8C] flex items-center justify-center text-[#FF6D05]">
                        {icon}
                    </div>
                    
                </div>
                <div className="flex flex-col gap-y-6 text-left xl:w-2/3 w-10/12">
                    <h1 className="text-TitleGray lg:text-2xl lg:text-left text-base text-center font-semibold">{title}</h1>
                    <p className="text-WeakGray lg:text-sm text-xs">{text}</p>
                </div>
        </div>
    )
}