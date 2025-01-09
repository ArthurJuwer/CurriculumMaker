export default function ButtonNext({ onClick }) {
    return (
        <button 
            className="mt-2 w-full 2xl:p-4 p-3 rounded-xl bg-DefaultOrange text-white"
            onClick={onClick}
        >
            Proxima Etapa
        </button>
    );
}
