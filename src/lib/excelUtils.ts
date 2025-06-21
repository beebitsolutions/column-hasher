import * as XLSX from 'xlsx';

export interface ParsedExcelData {
  fileName: string;
  workbook: XLSX.WorkBook;
  worksheetName: string;
  data: (string | number | boolean | null)[][];
  headers: string[];
}

export const parseExcelFile = async (file: File): Promise<ParsedExcelData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert to array of arrays
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          header: 1,
          raw: false,
          defval: ''
        }) as (string | number | boolean | null)[][];
        
        // Extract headers (first row)
        const headers = jsonData[0] || [];
        
        resolve({
          fileName: file.name,
          workbook,
          worksheetName,
          data: jsonData,
          headers: headers.map(h => String(h || '')),
        });
      } catch (error) {
        reject(new Error('Error parsing Excel file: ' + (error as Error).message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const getColumnData = (data: (string | number | boolean | null)[][], columnIndex: number): string[] => {
  return data.slice(1).map(row => String(row[columnIndex] || ''));
};

export const updateColumnInData = (
  data: (string | number | boolean | null)[][],
  columnIndex: number,
  hashedValues: string[]
): (string | number | boolean | null)[][] => {
  const newData = [...data];
  
  for (let i = 1; i < newData.length; i++) {
    if (hashedValues[i - 1] !== undefined) {
      newData[i] = [...newData[i]];
      newData[i][columnIndex] = hashedValues[i - 1];
    }
  }
  
  return newData;
};

export const exportToExcel = (
  workbook: XLSX.WorkBook,
  worksheetName: string,
  data: (string | number | boolean | null)[][],
  fileName: string
): void => {
  // Create new worksheet with updated data
  const newWorksheet = XLSX.utils.aoa_to_sheet(data);
  
  // Replace the worksheet in the workbook
  const newWorkbook = XLSX.utils.book_new();
  // Copy all sheets
  Object.keys(workbook.Sheets).forEach(sheetName => {
    if (sheetName === worksheetName) {
      newWorkbook.Sheets[sheetName] = newWorksheet;
    } else {
      newWorkbook.Sheets[sheetName] = workbook.Sheets[sheetName];
    }
  });
  newWorkbook.SheetNames = workbook.SheetNames;

  
  // Generate file and download
  const excelBuffer = XLSX.write(newWorkbook, { 
    bookType: 'xlsx', 
    type: 'array' 
  });
  
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName.replace(/\.[^/.]+$/, '_hashed.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
