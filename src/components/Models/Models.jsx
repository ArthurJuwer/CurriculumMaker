import { Pipette } from "lucide-react"
import ModelsColors from "./ModelsColors"
import ModelsThemes from "./ModelsThemes"
import { useState } from "react"

export default function Models(){

    const colors = [
        {color: 'A5A5A5'},
        {color: 'AF9B94'},
        {color: '1E1E1E'},
        {color: '4F1213'},
        {color: '12384F'},
        {color: '124F2B'},
        {color: 'A8890D'},
    ]

    const [colorPass, setColorPass] = useState(colors[0].color) 
    const [selectedIndex, setSelectedIndex] = useState(null);


    return(
        <div className="h-screen w-full bg-DefaultGray flex flex-col text-center py-16 items-center gap-y-10">
            <h1 className="text-StrongGray font-bold text-4xl w-1/3">Escolha entre estes currículos  de alta aprovação</h1>
            <div className="p-2 bg-WeakLightGray w-auto flex gap-x-5">
                {colors.map((handleColor, index)=>(
                    <ModelsColors 
                        key={index} 
                        backgroundColor={handleColor.color} 
                        onClick={()=> {
                            setColorPass(handleColor.color)
                            setSelectedIndex(index)

                        }}
                        isSelected={selectedIndex === index}

                    />
                ))}
                <div className='h-8 w-8 border border-black flex items-center justify-center cursor-pointer'>
                    <Pipette className="w-5"/>
                </div>
            </div>
            <div className="flex justify-center gap-x-12 h-screen w-full">
                <ModelsThemes key={1} id={1} color={colorPass}/>
                <ModelsThemes key={2} id={2} color={colorPass}/>
                <ModelsThemes key={3} id={3} color={colorPass}/>
            </div>
        </div>
    )
}