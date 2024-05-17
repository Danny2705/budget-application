import * as React from "react";

// code referenced from figma and edited by Emon//


export default function RecentTransaction() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4 justify-center p-4 text-sm font-bold text-black bg-purple-500 max-md:flex-wrap">
        <div className="flex gap-4 max-md:flex-wrap">
          <div className="flex-1 text-center">Transaction No.</div>
          <div className="flex-1 text-center">Vender</div>
          <div className="flex-1">Date</div>
          <div className="flex-1">Location</div>
          <div className="flex-1">Subtotal</div>
          <div className="flex-1">Tax</div>
          <div className="flex-1">Total</div>
        </div>
        <div className="flex-1 text-center">Action</div>
      </div>
      <div className="flex gap-4 justify-between p-4 bg-purple-300 max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-4 px-px my-auto text-sm font-medium text-black max-md:flex-wrap">
          <div className="flex-1 text-center">2465343</div>
          <div className="flex-1 text-center">Walgreens</div>
          <div className="flex-1">03/28/2023</div>
          <div className="flex-1">Calgary, AB</div>
          <div className="flex-1">$27.60</div>
          <div className="flex-1">$1.38</div>
          <div className="flex-1">$28.98</div>
        </div>
        <div className="flex gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0a93e23abb322bf45904e76a27b2b6471c7b5435bfd94291f05a59d3230c93f?"
            className="shrink-0 w-6 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c450d4a6c39078bf48d7d5c93bad8a7432d543a8452f94f7302335c4e12fbc06?"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between p-4 bg-purple-500 max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-4 px-px my-auto text-sm font-medium text-black max-md:flex-wrap">
          <div className="flex-1 text-center">2465342</div>
          <div className="flex-1 text-center">Walmart</div>
          <div className="flex-1">03/28/2023</div>
          <div className="flex-1">Calgary, AB</div>
          <div className="flex-1">$45.00</div>
          <div className="flex-1">$2.25</div>
          <div className="flex-1">$47.25</div>
        </div>
        <div className="flex gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/485bcb88fc17619083393ec9d5e6502be370e1cb7c878badcef428dd39482c8e?"
            className="shrink-0 w-6 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc325834c2c1bdb35c360fcbb360662668282ed0fe1dca2083d7b4cda7b3c7f?"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between p-4 bg-purple-300 max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-4 px-px my-auto text-sm font-medium text-black max-md:flex-wrap">
          <div className="flex-1 text-center">2465341</div>
          <div className="flex-1 text-center">AB Clean</div>
          <div className="flex-1">03/27/2023</div>
          <div className="flex-1">Calgary, AB</div>
          <div className="flex-1">$45.00</div>
          <div className="flex-1">$2.25</div>
          <div className="flex-1">$47.25</div>
        </div>
        <div className="flex gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4f4ffb1f5bcc78cde836d17fb053f7cfadabce16f7b81eb535e5a8187f4b552?"
            className="shrink-0 w-6 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c450d4a6c39078bf48d7d5c93bad8a7432d543a8452f94f7302335c4e12fbc06?"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between p-4 bg-purple-500 max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-4 px-px my-auto text-sm font-medium text-black max-md:flex-wrap">
          <div className="flex-1 text-center">2465340</div>
          <div className="flex-1 text-center">GG Cafe’</div>
          <div className="flex-1">03/27/2023</div>
          <div className="flex-1">Calgary, AB</div>
          <div className="flex-1">$27.60</div>
          <div className="flex-1">$1.38</div>
          <div className="flex-1">$28.98</div>
        </div>
        <div className="flex gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/046599c4c41ba2ad7e5177545b19793c6872264b361c00c55c3b4337450f865a?"
            className="shrink-0 w-6 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc325834c2c1bdb35c360fcbb360662668282ed0fe1dca2083d7b4cda7b3c7f?"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between p-4 bg-purple-300 max-md:flex-wrap max-md:pr-5">
        <div className="flex gap-4 px-px my-auto text-sm font-medium text-black max-md:flex-wrap">
          <div className="flex-1 text-center">2465339</div>
          <div className="flex-1 text-center">CC Car wash</div>
          <div className="flex-1">03/27/2023</div>
          <div className="flex-1">Calgary, AB</div>
          <div className="flex-1">$27.60</div>
          <div className="flex-1">$1.38</div>
          <div className="flex-1">$28.98</div>
        </div>
        <div className="flex gap-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/79ce21b0151094bb7fb12135fe8bdffe434bad802c3b670b195802e398e5c33b?"
            className="shrink-0 w-6 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c450d4a6c39078bf48d7d5c93bad8a7432d543a8452f94f7302335c4e12fbc06?"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}


