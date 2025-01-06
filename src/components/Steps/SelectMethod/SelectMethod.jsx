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
        <div className="w-full h-dvh bg-DefaultGray flex flex-col justify-center items-center 2xl:gap-y-40 xl:gap-y-24 gap-y-16">
            <div className="flex flex-col justify-center items-center text-center 2xl:gap-y-28 xl:gap-y-12 gap-y-8">
                <h1 className="font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl lg:tracking-wide tracking-normal text-StrongGray lg:w-5/12 w-8/12">Carregar Dados Salvos Recentemente</h1> 
                <div className="2xl:w-7/12 xl:w-9/12 lg:w-10/12 w-11/12 flex items-center justify-center lg:gap-x-12 gap-x-6">
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
                <div className="absolute lg:top-14 lg:left-20 top-5 left-5">
                    <ButtonBack />
                </div>
                <button 
                    className="bg-DefaultOrange xl:p-4 xl:w-96 lg:w-80 w-11/12 p-3 rounded-xl text-white shadow-2xl font-bold"
                    onClick={handleNextPage}
                >
                    Continuar
                </button>
                
            </div>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-xl lg:w-4/12 w-11/12 flex flex-col gap-y-8 relative">
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