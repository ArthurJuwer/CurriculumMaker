export default function Title({title, description}){
    return(
        <div className="flex flex-col gap-y-3">
            <h1 className="text-TitleGray text-5xl font-bold">{title}</h1>
            <p className="text-base text-WeakGray font-semibold">{description}</p>
        </div>
    )
}