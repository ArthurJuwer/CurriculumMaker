export default function AppStepNavigator({ numberStep, textStep, isLastStep }) {
    return (
      <div className="flex justify-center items-center">
        <div 
          className={`flex gap-x-4 justify-center items-center px-10 h-[2px] border-NormalGray ${isLastStep ? '' : 'border-r-[10rem]'}`}>
          <span className="rounded-full bg-NormalGray text-StrongGray flex justify-center items-center p-2 h-10 w-10 font-semibold">
            {numberStep}
          </span>
          <h1 className="text-StrongGray font-semibold">{textStep}</h1>
        </div>
      </div>
    );
  }
  