import { create } from 'zustand';
import * as XLSX from 'xlsx';

export interface ExcelData {
  fileName: string;
  workbook: XLSX.WorkBook;
  worksheetName: string;
  data: (string | number | boolean | null)[][];
  headers: string[];
}

export interface ColumnPreview {
  original: string;
  hashed: string;
}

interface ExcelStore {
  // State
  excelData: ExcelData | null;
  selectedColumn: string | null;
  columnPreview: ColumnPreview[];
  isProcessing: boolean;
  error: string | null;

  // Actions
  setExcelData: (data: ExcelData) => void;
  setSelectedColumn: (column: string) => void;
  setColumnPreview: (preview: ColumnPreview[]) => void;
  setIsProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useExcelStore = create<ExcelStore>((set) => ({
  // Initial state
  excelData: null,
  selectedColumn: null,
  columnPreview: [],
  isProcessing: false,
  error: null,

  // Actions
  setExcelData: (data) => set({ excelData: data, error: null }),
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  setColumnPreview: (preview) => set({ columnPreview: preview }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),
  reset: () => set({
    excelData: null,
    selectedColumn: null,
    columnPreview: [],
    isProcessing: false,
    error: null,
  }),
}));
