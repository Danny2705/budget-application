import React from "react";

const JsonDisplay = ({ json }) => {
  return (
    <div className="relative w-[560px] h-[560px] bg-white shadow-2xl rounded-[8px] flex justify-center">
      {!!json && (
        <pre className="text-sm py-[8px] overflow-auto">
          {JSON.stringify(json, null, 2)}
        </pre>
      )}
    </div>
  );
};
export default JsonDisplay;
