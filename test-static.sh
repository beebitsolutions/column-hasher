#!/bin/bash

# Script para probar el build estático con Docker

echo "🏗️  Building Next.js static export..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

echo "🐳 Building Docker image..."
docker build -t column-hasher-static .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Docker image built successfully!"

echo "🚀 Starting container on http://localhost:3001"
docker run -d -p 3001:80 --name column-hasher-test column-hasher-static

echo "✅ Container started!"
echo "📂 Access the application at: http://localhost:3001"
echo ""
echo "To stop the container, run:"
echo "  docker stop column-hasher-test && docker rm column-hasher-test"
