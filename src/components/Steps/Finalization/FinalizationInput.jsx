export default function FinalizationInput({label, id, onChange, value, placeholder}){
    return(
        <div className="flex flex-col gap-y-4">
            <label htmlFor={id} className="uppercase text-TitleGray font-semibold">{label}</label>
            <input 
                type="text" 
                id={id} 
                className="border w-full border-BorderInputGray bg-transparent 2xl:p-4 p-3 rounded-xl"
                onChange={onChange}
                value={value}  
                placeholder={placeholder}  
            />
        </div>
    )
}