// Reference: a) "builder IO" - https://www.builder.io/ b) figma
// Create new budget component
const CreateBudgetIcons = async() => {
    const fetchIconImage = await fetch(`https://cdn.builder.io/api/v1/image/assets/TEMP/462ba722d4ced754bf7abb503e9d4642d72cece0aad17286d943ac366b2387b6?`)
}

export default function CreateBudget() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col py-10 bg-white rounded-3xl border border-fuchsia-800 border-solid max-w-[726px]">
        <div className="self-center text-3xl font-bold text-black tracking-[2.1px]">
          New Budget
        </div>
        <div className="flex flex-col px-12 mt-8 w-full text-base text-zinc-600 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-2 p-2.5 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0 max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/462ba722d4ced754bf7abb503e9d4642d72cece0aad17286d943ac366b2387b6?"
              className="shrink-0 w-6 aspect-square"
            />
            <div className="flex-auto my-auto max-md:max-w-full">
              Budget Title
            </div>
          </div>
          <div className="shrink-0 mt-6 bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0 h-[43px] max-md:max-w-full" />
          <div className="flex gap-5 justify-between py-2.5 pr-20 mt-7 w-full bg-purple-300 rounded-lg border border-solid border-fuchsia-800 border-opacity-0 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-3">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a8a0c821a130711fcb5cdf5b96221f0414c23ce70b06d30da8dd61bb5efc647?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="my-auto">Select budget period</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3b61b176dee090ab9c5d1a978c21c25e8ec784184a3ea869d2e935cb4d6ec26?"
              className="shrink-0 w-6 aspect-square"
            />
          </div>
          

          
          <div className="justify-center items-center px-16 py-4 mt-6 text-xl font-semibold tracking-widest text-black bg-indigo-300 rounded-2xl border border-fuchsia-800 border-solid max-md:px-5 max-md:max-w-full">
            Save New Budget
          </div>
        </div>
      </div>
      );
    </div>
  );
}
