import { createContext, useState } from "react";

export const CurriculumContext = createContext();

export const CurriculumProvider = ({ children }) => {

    const [values, setValues] = useState(null); 

    return (
        <CurriculumContext.Provider value={{
            setValues, values  
            }}>
            {children}
        </CurriculumContext.Provider>
    );
};
