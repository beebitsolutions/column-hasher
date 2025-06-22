#!/bin/bash

# Script para limpiar el contenedor de prueba

echo "🧹 Stopping and removing test container..."

docker stop column-hasher-test 2>/dev/null
docker rm column-hasher-test 2>/dev/null
docker rmi column-hasher-static 2>/dev/null

echo "✅ Cleanup completed!"
