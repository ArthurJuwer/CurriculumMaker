export default function ColorSwatch({ backgroundColor, isSelected, onClick, isRounded }) {
  return (
    <div
      className={`2xl:size-8 size-7 block cursor-pointer ${isRounded ?? ""} ${
        isSelected ? "border-2 border-black" : ""
      }`}
      style={{ backgroundColor: `#${backgroundColor}` }}
      onClick={onClick}
    />
  );
}
