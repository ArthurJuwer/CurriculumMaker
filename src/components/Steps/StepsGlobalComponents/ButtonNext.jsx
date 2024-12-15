import { Link } from "react-router-dom";

export default function ButtonNext({link, onClick}){
    return(
        <Link to={link}>
            <button 
                className="w-full p-4 rounded-xl bg-DefaultOrange text-white"
                onClick={onClick}
            >
            Proxima Etapa
            </button>
        </Link>
    )
}