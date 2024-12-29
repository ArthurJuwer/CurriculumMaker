export default function ButtonNext({ onClick }) {
    return (
        <button 
            className="w-full p-4 rounded-xl bg-DefaultOrange text-white"
            onClick={onClick}
        >
            Proxima Etapa
        </button>
    );
}
