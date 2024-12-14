export default function Input({ id, label, width , isLast, isSelect}) {
    return (
        <div
            className={`relative ${width} ${isLast ? 'last:w-full' : ''}`}
            
        >
            <label
                htmlFor={`input-${id}`}
                className="absolute bottom-12 left-4 bg-DefaultGray px-2 font-semibold text-TitleGray uppercase z-0"
            >
                {label}
            </label>
            <input
                type="text"
                id={`input-${id}`}
                className="border w-full border-BorderInputGray bg-transparent p-4 rounded-xl z-10 "
            />
        
            {isSelect == true 
                ? 
                    id == 0 ? 
                        <h1 className="absolute right-4 bottom-3 px-5 rounded-xl py-1 bg-transparent border border-BorderInputGray text-TitleGray font-semibold">NATIVO</h1> 
                    :

                    <select name="" id="" className="absolute right-4 bottom-3 px-5 rounded-xl py-1 bg-transparent border border-BorderInputGray text-TitleGray font-semibold">
                        <option value="A1">A1</option>
                        <option value="A1">A2</option>
                    </select> 
                    : ''
                }


        </div>
    );
}
