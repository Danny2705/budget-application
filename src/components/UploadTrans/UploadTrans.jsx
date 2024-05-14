import React from "react";
import DragDrop from "./DragDrop";
import FileDisplay from "./FileDisplay";
import JsonDisplay from "./JsonDisplay";
import SaveButton from "./SaveButton";

const UploadTrans = () => {
  return (
    <div class="mt-100 bg-white md:flex flex-col">
      <DragDrop />
      <div class="flex flex-row py-[16px] px-[32px]">
        <FileDisplay />
        <div class="w-[56px]"/>
        <JsonDisplay />
      </div>
      <SaveButton />
    </div>
  );
};

export default UploadTrans;

/* Daily spending container */

// position: absolute;
// width: 1171px;
// height: 801px;
// left: 55px;
// top: 223px;

// background: #FFFFFF;
// border-radius: 24px;
