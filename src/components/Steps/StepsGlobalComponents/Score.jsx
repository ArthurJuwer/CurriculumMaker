export default function Score({ scoreValue }) {
    return (
      <div className="flex items-center justify-between border-b-4 border-scoreColors-red pb-4">
        <div className="flex items-center gap-x-3">
          <span className="h-9 w-16 bg-scoreColors-red text-white flex items-center justify-center rounded-3xl font-semibold">
            {scoreValue}%
          </span>
          <p className="text-WeakGray text-base font-semibold">Pontuação do Currículo</p>
        </div>
  
        
        <div className="group w-9 h-9 rounded-full bg-TitleGray text-xl text-white flex items-center justify-center relative">
          !
          <div className="hidden group-hover:block min-w-max absolute top-12 left-1/2 transform -translate-x-1/2 bg-white text-black p-2 rounded-md shadow-lg text-sm">
            <p>Adicione o LinkedIn</p>
          </div>
        </div>
      </div>
    );
  }
  