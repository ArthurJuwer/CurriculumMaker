export default function Title({title, description}){
    return(
        <div className="flex flex-col gap-y-3">
            <h1 className="text-TitleGray 2xl:text-5xl text-4xl font-bold">{title}</h1>
            <p className="2xl:text-base text-sm text-WeakGray font-semibold">{description}</p>
        </div>
    )
}