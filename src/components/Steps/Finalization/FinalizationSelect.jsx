export default function FinalizationSelect({label, id, onChange, defaultValue, options}) {
    return (
        <div className="flex flex-col gap-y-4">
            <label htmlFor={id} className="uppercase text-TitleGray font-semibold">{label}</label>
            <select 
                id={id} 
                className="border w-full border-BorderInputGray bg-transparent p-4 rounded-xl"
                onChange={onChange}
                defaultValue={defaultValue} // Define o valor padrão
            >
                {options?.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}
