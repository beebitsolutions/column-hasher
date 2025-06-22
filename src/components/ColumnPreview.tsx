'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useExcelStore } from '@/store/excelStore';

export const ColumnPreview: React.FC = () => {
  const { columnPreview, selectedColumn, salt } = useExcelStore();

  if (!selectedColumn || columnPreview.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista Previa: {selectedColumn}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Mostrando las primeras {columnPreview.length} filas con vista previa del hash SHA-512
          {salt && <span> (con sal: &quot;{salt}&quot;)</span>}
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Valor Original</TableHead>
                <TableHead className="w-1/2">Hash SHA-512</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columnPreview.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="max-w-xs truncate" title={item.original}>
                      {item.original || <span className="text-muted-foreground italic">(vacío)</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-xs max-w-xs truncate" title={item.hashed}>
                      {item.hashed}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
