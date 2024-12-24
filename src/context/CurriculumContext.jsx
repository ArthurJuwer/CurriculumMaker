import { createContext, useState, useEffect } from "react";

export const CurriculumContext = createContext();

export const CurriculumProvider = ({ children }) => {
    // Inicializa valores com base no localStorage ou com null
    const [values, setValues] = useState(() => {
        const storedValues = localStorage.getItem("curriculumValues");
        return storedValues ? JSON.parse(storedValues) : null;
    });

    // Atualiza o localStorage sempre que 'values' mudar
    useEffect(() => {
        if (values !== null) {
            localStorage.setItem("curriculumValues", JSON.stringify(values));
        }
    }, [values]);

    return (
        <CurriculumContext.Provider value={{ setValues, values }}>
            {children}
        </CurriculumContext.Provider>
    );
};
