export default function FinalizationInput({label, id, onChange, value}){
    return(
        <div className="flex flex-col gap-y-4">
            <label htmlFor={id} className="uppercase text-TitleGray font-semibold">{label}</label>
            <input 
                type="text" 
                id={id} 
                className="border w-full border-BorderInputGray bg-transparent p-4 rounded-xl"
                onChange={onChange}
                value={value}    
            />
        </div>
    )
}