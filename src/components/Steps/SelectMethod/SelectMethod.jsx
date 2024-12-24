import { useNavigate } from "react-router-dom";
import SelectMethodOptions from "./SelectMethodOptions";
import { Plus, RotateCcw, X } from "lucide-react";
import { useContext, useState } from "react";
import { CurriculumContext } from "../../../context/CurriculumContext";
import ButtonBack from "../StepsGlobalComponents/ButtonBack";

export default function SelectMethod(){
    const [selectFirst, setSelectFirst] = useState(true)
    const [selectSecond, setSelectSecond] = useState(false)
    const [isModalOpen, SetIsModalOpen] = useState(false)
    const {setValues} = useContext(CurriculumContext)
    const navigate = useNavigate();

    const methodOptions = [
        {select: selectFirst, title: 'Carregar Dados', text: 'Nós iremos pegar os dados antigos que você escreveu e preencher todos os campos deixando você modificar os antigos dados', icon: <RotateCcw width={35} height={35} />},
        {select: selectSecond, title: 'Novo Currículo', text: 'Nós iremos pegar os dados antigos que você escreveu e preencher todos os campos deixando você modificar os antigos dados', icon: <Plus width={35} height={35} />}
    ]
    const handleSelect = (id) =>{
        if(id  === 0){
            setSelectFirst(true)
            setSelectSecond(false)  
        } else {
            setSelectFirst(false)
            setSelectSecond(true)  
        }
        
    }
    const handleNextPage = () =>{
        if(selectSecond){
            SetIsModalOpen(true)
        } else {
            navigate('/steps/models')
        }
        
    }
    const handleHideModal = () => {
        SetIsModalOpen(false)
        
    }
    const handleNewCurriculum = () => {
        setValues(null);        
        localStorage.removeItem('curriculumValues');
        localStorage.clear()
        navigate('/steps/models')
    }
    

    return(
        <div className="w-full h-screen bg-DefaultGray flex flex-col justify-center items-center gap-y-40">
            <div className="flex flex-col justify-center items-center text-center gap-y-28">
                <h1 className="font-bold text-5xl tracking-wide text-StrongGray w-5/12">Carregar Dados Salvos Recentemente</h1> 
                <div className="w-7/12 flex items-center justify-center gap-x-12">
                    {methodOptions.map((item, index)=>(
                        <SelectMethodOptions 
                        key={index}
                        icon={item?.icon}
                        title={item?.title}
                        text={item?.text}
                        select={item?.select}
                        onClick={()=> handleSelect(index)}
                        />
                    ))}
                </div>         
                <div className="absolute top-14 left-20">
                    <ButtonBack />
                </div>
                <button 
                    className="bg-DefaultOrange p-4 w-96 rounded-xl text-white shadow-2xl font-bold"
                    onClick={handleNextPage}
                >
                    Continuar
                </button>
                
            </div>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-xl w-4/12 flex flex-col gap-y-8 relative">
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-bold">Deseja Resetar Seu Currículo?</h2>
                    <button
                        onClick={handleHideModal}
                    >
                        <X />
                    </button>
                </div>
                    <p>Tem certeza de que deseja excluir este currículo? Uma vez excluído, este currículo não pode ser restaurado.</p>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleHideModal}
                            className="px-4 py-2 bg-TitleGray text-white rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleNewCurriculum}
                            className="px-8 py-2 bg-DefaultOrange text-white rounded-lg"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>  
    )
}