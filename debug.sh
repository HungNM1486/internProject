#!/bin/bash

echo "🔍 DEBUG TAILWINDCSS STEP BY STEP"
echo "=================================="

# 1. Kiểm tra cấu trúc file
echo "📁 1. KIỂM TRA CẤU TRÚC FILE:"
echo "Current directory: $(pwd)"
ls -la

echo ""
echo "📄 2. KIỂM TRA NỘI DUNG FILE:"

# Kiểm tra main.tsx
echo "--- src/main.tsx ---"
if [ -f "src/main.tsx" ]; then
    cat src/main.tsx
else
    echo "❌ File src/main.tsx không tồn tại!"
fi

echo ""
echo "--- src/index.css ---"
if [ -f "src/index.css" ]; then
    cat src/index.css
else
    echo "❌ File src/index.css không tồn tại!"
fi

echo ""
echo "--- tailwind.config.js ---"
if [ -f "tailwind.config.js" ]; then
    cat tailwind.config.js
else
    echo "❌ File tailwind.config.js không tồn tại!"
fi

echo ""
echo "--- postcss.config.js ---"
if [ -f "postcss.config.js" ]; then
    cat postcss.config.js
else
    echo "❌ File postcss.config.js không tồn tại!"
fi

echo ""
echo "📦 3. KIỂM TRA DEPENDENCIES:"
echo "--- TailwindCSS version ---"
npm list tailwindcss

echo ""
echo "--- PostCSS version ---"
npm list postcss

echo ""
echo "--- All dev dependencies ---"
npm list --depth=0 --dev

echo ""
echo "🚀 4. KIỂM TRA BUILD:"
echo "--- Build TailwindCSS manually ---"
if [ -f "node_modules/.bin/tailwindcss" ]; then
    ./node_modules/.bin/tailwindcss -i ./src/index.css -o ./dist/test-output.css --watch=false
    echo "Output file created: dist/test-output.css"
    if [ -f "dist/test-output.css" ]; then
        echo "✅ TailwindCSS build thành công!"
        echo "--- First 20 lines of output ---"
        head -20 dist/test-output.css
    else
        echo "❌ TailwindCSS build failed!"
    fi
else
    echo "❌ TailwindCSS binary không tồn tại!"
fi