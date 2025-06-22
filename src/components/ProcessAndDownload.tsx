'use client';

import { useCallback, useState } from 'react';
import { Hash, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useExcelStore } from '@/store/excelStore';
import { getColumnData, updateColumnInData, exportToExcel } from '@/lib/excelUtils';
import { hashValues } from '@/lib/hashUtils';

export const ProcessAndDownload: React.FC = () => {
  const { 
    excelData, 
    selectedColumn, 
    setError,
    reset,
    salt
  } = useExcelStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProcess = useCallback(async () => {
    if (!excelData || !selectedColumn) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const columnIndex = excelData.headers.indexOf(selectedColumn);
      if (columnIndex === -1) {
        throw new Error('Column not found');
      }

      // Get column data
      const columnData = getColumnData(excelData.data, columnIndex);
      
      // Update progress
      setProgress(25);

      // Hash all values in batches for better performance
      const batchSize = 100;
      const hashedValues: string[] = [];
      
      for (let i = 0; i < columnData.length; i += batchSize) {
        const batch = columnData.slice(i, i + batchSize);
        const hashedBatch = await hashValues(batch, salt);
        hashedValues.push(...hashedBatch);
        
        // Update progress
        const progressValue = 25 + (i / columnData.length) * 50;
        setProgress(Math.min(progressValue, 75));
      }

      setProgress(80);

      // Update the data with hashed values
      const updatedData = updateColumnInData(excelData.data, columnIndex, hashedValues);
      
      setProgress(90);

      // Export to Excel
      exportToExcel(
        excelData.workbook,
        excelData.worksheetName,
        updatedData,
        excelData.fileName
      );

      setProgress(100);

      // Reset after a short delay
      setTimeout(() => {
        setProgress(0);
        setIsProcessing(false);
      }, 1000);

    } catch (error) {
      setError((error as Error).message);
      setIsProcessing(false);
      setProgress(0);
    }
  }, [excelData, selectedColumn, setError, salt]);

  const handleReset = useCallback(() => {
    reset();
    setProgress(0);
  }, [reset]);

  if (!excelData || !selectedColumn) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Procesar y Descargar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Procesando...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
        
        <div className="flex gap-3">
          <Button 
            onClick={handleProcess} 
            disabled={isProcessing}
            className="flex-1"
          >
            <Hash className="w-4 h-4 mr-2" />
            {isProcessing ? 'Procesando...' : 'Hashear Columna y Descargar'}
          </Button>
          
          <Button 
            onClick={handleReset} 
            variant="outline"
            disabled={isProcessing}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Esto aplicará hash SHA-512 a todos los valores de la columna &quot;{selectedColumn}&quot;
            {salt && <span> con la sal &quot;{salt}&quot;</span>}
            {' '}y descargará el archivo Excel modificado.
          </p>
          {salt && (
            <p className="mt-1 text-xs">
              Formato: <span className="font-mono bg-muted px-1 rounded">valor + &quot;{salt}&quot;</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
