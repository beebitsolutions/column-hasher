'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { useExcelStore } from '@/store/excelStore';
import { FileUploader } from '@/components/FileUploader';
import { ColumnSelector } from '@/components/ColumnSelector';
import { ColumnPreview } from '@/components/ColumnPreview';
import { SHA512Info } from '@/components/SHA512Info';
import { ProcessAndDownload } from '@/components/ProcessAndDownload';
import { SaltInput } from '@/components/SaltInput';
import { GitHubButton } from '@/components/GitHubButton';
import { AlertCircle } from 'lucide-react';

export const ExcelHasher: React.FC = () => {
  const { error, isProcessing } = useExcelStore();

  return (
    <>
      <GitHubButton />
      <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Hasher de Columnas Excel</h1>
        <p className="text-muted-foreground text-lg">
          Sube un archivo Excel, selecciona una columna y aplica hash SHA-512 a sus valores
        </p>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <SHA512Info />
        <FileUploader />
        <SaltInput />
        <ColumnSelector />
        <ColumnPreview />
        <ProcessAndDownload />
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg border">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Procesando...</span>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};
