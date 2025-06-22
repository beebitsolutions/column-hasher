'use client';

import { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useExcelStore } from '@/store/excelStore';
import { Key } from 'lucide-react';

export const SaltInput: React.FC = () => {
  const { salt, setSalt } = useExcelStore();

  const handleSaltChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSalt(e.target.value);
  }, [setSalt]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Sal Opcional
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Añade una sal para mayor seguridad. Se añadirá al final de cada valor antes del hash.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="salt-input">Sal (opcional)</Label>
          <Input
            id="salt-input"
            type="text"
            placeholder="Introduce una sal opcional..."
            value={salt}
            onChange={handleSaltChange}
            className="font-mono"
          />
          {salt && (
            <p className="text-xs text-muted-foreground">
              Cada valor se convertirá en: <span className="font-mono bg-muted px-1 rounded">valor + &quot;{salt}&quot;</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
