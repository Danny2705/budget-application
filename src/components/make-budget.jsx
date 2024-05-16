export default function NewBudget() {
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
          <div className="flex flex-col p-6 mt-4 max-w-full font-bold text-center text-gray-600 bg-white rounded-lg shadow-lg leading-[112.5%] w-[306px] max-md:px-5">
            <div className="flex gap-5 justify-between text-sm leading-4">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4f65425f12ceaeed3e4278a33a5d09404e54bc55120dc89226bf528d3f75973?"
                className="shrink-0 w-4 aspect-square"
              />
              <div>May 2024</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f77028cb62432b0de321180fa31312786c7f96f97257880cdd64af9b3a85594e?"
                className="shrink-0 w-4 aspect-square"
              />
            </div>
            <div className="flex gap-2 justify-between px-0.5 py-1 mt-6 text-xs tracking-widest leading-3 uppercase text-neutral-300">
              <div>SAN</div>
              <div>MON </div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>
            <div className="flex gap-2 justify-between py-2 pr-2.5 mt-6 whitespace-nowrap">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
            </div>
            <div className="flex gap-2 justify-between py-2 pr-2.5 mt-2 whitespace-nowrap">
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
            </div>
            <div className="flex gap-2 justify-between items-center pl-1.5 mt-2 whitespace-nowrap">
              <div className="self-stretch my-auto">15</div>
              <div className="self-stretch my-auto">16</div>
              <div className="self-stretch my-auto">17</div>
              <div className="self-stretch my-auto">18</div>
              <div className="flex overflow-hidden relative flex-col gap-3.5 self-stretch text-white aspect-[3.53] fill-indigo-300 fill-opacity-30">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/00d44d35a56a15f802efe74ac225cb670fa7ae82f94b717071638f29b6ce6399?"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="relative justify-center items-center px-1.5 bg-zinc-600 h-[30px] rounded-[29px] w-[30px]">
                  19
                </div>
                <div className="relative my-auto text-gray-600">20</div>
                <div className="relative justify-center items-center px-1.5 bg-zinc-600 h-[30px] rounded-[29px] w-[30px]">
                  21
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-between py-2 pr-2.5 mt-2 whitespace-nowrap">
              <div>22</div>
              <div>23</div>
              <div>24</div>
              <div>25</div>
              <div>26</div>
              <div>27</div>
              <div>28</div>
            </div>
            <div className="flex gap-2 py-2 pr-20 mt-2 whitespace-nowrap max-md:pr-5">
              <div>29</div>
              <div>30</div>
              <div>31</div>
            </div>
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
