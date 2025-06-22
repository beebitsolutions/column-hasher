'use client';

import { useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExcelStore } from '@/store/excelStore';
import { getColumnData } from '@/lib/excelUtils';
import { createColumnPreview } from '@/lib/hashUtils';

export const ColumnSelector: React.FC = () => {
  const { 
    excelData, 
    selectedColumn, 
    setSelectedColumn, 
    setColumnPreview, 
    setError,
    setIsProcessing,
    salt
  } = useExcelStore();

  // Effect to update preview when salt changes
  useEffect(() => {
    const updatePreview = async () => {
      if (!excelData || !selectedColumn) return;
      
      setIsProcessing(true);
      setError(null);
      
      try {
        const columnIndex = excelData.headers.indexOf(selectedColumn);
        if (columnIndex === -1) return;
        
        const columnData = getColumnData(excelData.data, columnIndex);
        const preview = await createColumnPreview(columnData, salt, 10);
        setColumnPreview(preview);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsProcessing(false);
      }
    };
    
    updatePreview();
  }, [salt, excelData, selectedColumn, setColumnPreview, setError, setIsProcessing]); // Re-run when salt changes

  const handleColumnSelect = useCallback(async (columnName: string) => {
    if (!excelData) return;

    setIsProcessing(true);
    setError(null);
    setSelectedColumn(columnName);

    try {
      const columnIndex = excelData.headers.indexOf(columnName);
      if (columnIndex === -1) {
        throw new Error('Column not found');
      }

      const columnData = getColumnData(excelData.data, columnIndex);
      const preview = await createColumnPreview(columnData, salt, 10);
      setColumnPreview(preview);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  }, [excelData, setSelectedColumn, setColumnPreview, setError, setIsProcessing, salt]);

  if (!excelData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seleccionar Columna a Hashear</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedColumn || ''} onValueChange={handleColumnSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Elige una columna..." />
          </SelectTrigger>
          <SelectContent>
            {excelData.headers.map((header, index) => (
              <SelectItem key={index} value={header}>
                {header || `Column ${index + 1}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
