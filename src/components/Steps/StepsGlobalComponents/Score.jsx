export default function Score(){
    return(
        <div className="border-b-4 border-scoreColors-red flex items-center gap-x-3 pb-4">
            <span className="h-9 w-16 bg-scoreColors-red text-white flex items-center justify-center rounded-3xl font-semibold">15%</span>
            <p className="text-WeakGray text-base font-semibold">Pontuação do Curriculo</p>
        </div>
    )
}