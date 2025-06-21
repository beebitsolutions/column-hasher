"use client";

import { useCallback } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useExcelStore } from "@/store/excelStore";
import { parseExcelFile } from "@/lib/excelUtils";

interface FileUploaderProps {
  onFileLoaded?: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoaded }) => {
  const { setExcelData, setError, setIsProcessing, excelData } =
    useExcelStore();

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (!file) return;

      // Validate file type
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!validTypes.includes(file.type)) {
        setError("Por favor selecciona un archivo Excel válido (.xls o .xlsx)");
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const excelData = await parseExcelFile(file);
        setExcelData(excelData);
        onFileLoaded?.();
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsProcessing(false);
      }
    },
    [setExcelData, setError, setIsProcessing, onFileLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  if (excelData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-lg">{excelData.fileName}</h3>
              <p className="text-sm text-muted-foreground">
                Hoja: {excelData.worksheetName} • {excelData.headers.length}{" "}
                columnas • {excelData.data.length - 1} filas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="px-8">
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Subir Archivo Excel</h3>
          <p className="text-muted-foreground mb-4">
            Arrastra y suelta tu archivo Excel aquí, o haz clic para buscar
          </p>
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Seleccionar Archivo
            </label>
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};
