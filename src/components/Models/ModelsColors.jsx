export default function ModelsColors({ backgroundColor, isSelected, onClick }) {
    return (
        <div
            className={`h-8 w-8 block cursor-pointer ${
                isSelected ? 'border-2 border-black' : 'border-TitleGray'
            }`}
            style={{ backgroundColor: `#${backgroundColor}` }}
            onClick={onClick}
        />
    );
}