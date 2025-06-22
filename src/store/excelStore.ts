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
  salt: string;

  // Actions
  setExcelData: (data: ExcelData) => void;
  setSelectedColumn: (column: string) => void;
  setColumnPreview: (preview: ColumnPreview[]) => void;
  setIsProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  setSalt: (salt: string) => void;
  reset: () => void;
}

export const useExcelStore = create<ExcelStore>((set) => ({
  // Initial state
  excelData: null,
  selectedColumn: null,
  columnPreview: [],
  isProcessing: false,
  error: null,
  salt: '',

  // Actions
  setExcelData: (data) => set({ excelData: data, error: null }),
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  setColumnPreview: (preview) => set({ columnPreview: preview }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),
  setSalt: (salt) => set({ salt: salt.trim() }),
  reset: () => set({
    excelData: null,
    selectedColumn: null,
    columnPreview: [],
    isProcessing: false,
    error: null,
    salt: '',
  }),
}));
