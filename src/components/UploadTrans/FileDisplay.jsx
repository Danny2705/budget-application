import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const FileDisplay = ({ fileUrl, pdfFiles }) => {
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    if (!fileUrl || !pdfFiles) {
      return;
    }
    console.log("FileDisplay", pdfFiles, fileUrl);

    if (pdfFiles && pdfFiles.length > 0) {
      setIsPdf(true);
    } else {
      setIsPdf(false);
    }
  }, [fileUrl, pdfFiles]);

  console.log("isPdf", isPdf);

  return (
    <div className="relative w-[560px] h-[560px] bg-gray-300 shadow-2xl rounded-[8px] overflow-y-auto">
      <div className="flex justify-center py-[8px]">
        {isPdf ? (
          <div className="w-full h-full">
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={fileUrl} />
            </Worker>
          </div>
        ) : (
          <img
            src={fileUrl}
            alt="Uploaded file"
            className="max-w-full max-h-full"
          />
        )}
      </div>
    </div>
  );
};

export default FileDisplay;
