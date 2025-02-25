import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (data, fileName = "data_export") => {

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  const workbook = {
    Sheets: { data: worksheet },
    SheetNames: ["data"],
  };

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(dataBlob, `${fileName}.xlsx`);
};

export default exportToExcel;
