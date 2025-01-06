export default function AppStepNavigator({ numberStep, textStep, isLastStep }) {
    return (
      <div className="flex justify-center items-center">
        <div 
          className={`flex flex-col gap-y-4 xl:gap-y-0 xl:flex-row xl:gap-x-4 justify-center items-center 2xl:px-10 xl:px-8 px-2 h-[2px] border-NormalGray ${isLastStep ? '' : 'xl:border-r-[10rem] lg:border-r-[8rem] border-r-[2rem]'}`}>
            <span className="mt-12 xl:mt-0 rounded-full bg-NormalGray text-StrongGray flex justify-center items-center xl:p-4 lg:p-3 p-2 size-10 font-semibold">
              {numberStep}
            </span>
            <h1 className="text-StrongGray text-center text-sm xl:text-base font-semibold w-full">{textStep}</h1>
        </div>
      </div>
    );
  }
  