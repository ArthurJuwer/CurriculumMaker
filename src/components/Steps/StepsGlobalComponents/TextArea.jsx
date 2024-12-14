export default function TextArea({ id, label, width, isLast}){
    return(
        <div
            className={`relative ${width} h-40 ${isLast ? 'last:w-full' : ''}`}
            
        >
            <label
                htmlFor={`input-${id}`}
                className="absolute bottom-[9.2rem] left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
            >
                {label}
            </label>
            
            <textarea
                type="text"
                id={`input-${id}`}
                className="border w-full h-full border-BorderInputGray bg-transparent p-4 rounded-xl z-10 resize-none"
            />
        </div>
    )
}