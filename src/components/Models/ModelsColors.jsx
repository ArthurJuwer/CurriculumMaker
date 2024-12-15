export default function ModelsColors({ backgroundColor, isSelected, onClick, isRounded }) {
    return (
        // TRANSFORMAR PARA HOOK
        <div
            className={`h-8 w-8 block cursor-pointer ${isRounded} ${
                isSelected ? 'border-2 border-black' : 'border-TitleGray'
            }`}
            style={{ backgroundColor: `#${backgroundColor}` }}
            onClick={onClick}
        />
    );
}