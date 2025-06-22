# Column Hasher

Herramienta web para aplicar hash SHA-512 a columnas de archivos Excel de forma segura y privada.

🌐 **[Ver aplicación en vivo](https://beebitsolutions.github.io/column-hasher/)**

## Características

- ✅ **100% Cliente**: Todo el procesamiento se realiza en el navegador
- ✅ **Seguro**: Utiliza SHA-512 con sal opcional
- ✅ **Privado**: Ningún dato sale de tu dispositivo
- ✅ **Fácil de usar**: Interfaz intuitiva drag & drop
- ✅ **Vista previa**: Ve el resultado antes de procesar

## Desarrollo

```bash
npm install
npm run dev
```

## Probar Build Estático Localmente

### Opción 1: Con Docker (recomendado)

```bash
# Construir y probar con Docker
npm run test:static

# La aplicación estará disponible en http://localhost:3001

# Para limpiar después de las pruebas
npm run cleanup:test
```

### Opción 2: Con Docker Compose

```bash
# Construir y servir con docker-compose
npm run test:static:compose

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Opción 3: Manual

```bash
# Generar archivos estáticos
npm run build

# Los archivos estarán en la carpeta 'out/'
# Puedes servirlos con cualquier servidor web estático
```

## Despliegue

Este proyecto está configurado para despliegue automático en GitHub Pages:

```bash
npm run build
```

El sitio se genera como SSG (Static Site Generation) en la carpeta `out/`.

## Tecnologías

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Zustand
- XLSX
- Web Crypto API

## Funcionalidades

### 1. Carga de Archivos Excel

- Drag & drop o selección manual
- Soporte para .xlsx y .xls
- Validación automática de formato

### 2. Selección de Columnas

- Dropdown con todas las columnas disponibles
- Información del archivo (hojas, columnas, filas)

### 3. Sal Opcional

- Campo de texto para sal personalizada
- Se añade al final de cada valor antes del hash
- Trim automático para evitar espacios

### 4. Vista Previa

- Muestra los primeros 10 valores
- Comparación lado a lado: original vs hash
- Actualización en tiempo real al cambiar la sal

### 5. Procesamiento y Descarga

- Hash SHA-512 de toda la columna
- Barra de progreso en tiempo real
- Descarga automática del archivo modificado
- Mantiene el formato original del Excel

## Seguridad

- **Procesamiento local**: Ningún archivo se envía a servidores externos
- **SHA-512**: Algoritmo criptográfico robusto
- **Sal opcional**: Mayor seguridad con valores personalizados
- **Web Crypto API**: Implementación nativa del navegador
