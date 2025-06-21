'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ExternalLink } from 'lucide-react';

export const SHA512Info: React.FC = () => {
  return (
    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
          <Shield className="h-5 w-5" />
          ¿Qué es SHA-512?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-blue-800 dark:text-blue-200">
          <strong>SHA-512</strong> es un algoritmo de hash criptográfico que forma parte de la familia SHA-2. 
          Convierte cualquier dato de entrada en una cadena única de 512 bits (128 caracteres hexadecimales).
        </p>
        
        <div className="space-y-2">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>¿Por qué es seguro?</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300 ml-2">
            <li><strong>Unidireccional:</strong> Es computacionalmente imposible obtener el dato original desde el hash</li>
            <li><strong>Determinista:</strong> El mismo input siempre produce el mismo hash</li>
            <li><strong>Resistente a colisiones:</strong> Extremadamente difícil que dos inputs diferentes produzcan el mismo hash</li>
            <li><strong>Avalancha:</strong> Un pequeño cambio en el input cambia drásticamente el hash resultante</li>
          </ul>
        </div>

        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-green-800 dark:text-green-200 font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <strong>100% Seguro y Privado</strong>
          </p>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            Todos los datos se procesan localmente en tu navegador. Ningún archivo o información 
            sale de tu dispositivo, garantizando la máxima privacidad y seguridad de tus datos.
          </p>
        </div>

        <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
          <a 
            href="https://es.wikipedia.org/wiki/SHA-2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
          >
            Más información sobre SHA-2 en Wikipedia
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
