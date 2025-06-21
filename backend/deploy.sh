#!/bin/bash

echo "🚀 Deploying MangaMecca Backend to Render..."

# Check if required environment variables are set
if [ -z "$MONGO_URI" ]; then
    echo "❌ Error: MONGO_URI environment variable is not set"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ Error: JWT_SECRET environment variable is not set"
    exit 1
fi

echo "✅ Environment variables are set"
echo "📦 Installing dependencies..."
npm install

echo "🔧 Building application..."
npm run build

echo "✅ Backend is ready for deployment!"
echo "🌐 Deploy to Render using: render deploy" 