import React from "react";
import pdfPath from "./awaken-workbook.pdf";
import { notification } from "antd";
function DownloadSamplePDF() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.info({
      message: `Your report is getting downloaded`,
    });
  };

  const downloadPdf = () => {
    openNotification();
    // Construct the path to your PDF file

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = pdfPath;

    // Set the 'download' attribute to prompt the user to download the file
    link.download = "awaken-workbook.pdf";

    // Trigger a click event to initiate the download
    link.click();
  };

  return (
    <div   onClick={downloadPdf}>
      {contextHolder}
   
    </div>
  );
}

export default DownloadSamplePDF;
