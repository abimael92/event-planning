#!/bin/bash

# ULTRA LOW MEMORY BUILD SCRIPT
# Use this when you're getting "JavaScript heap out of memory" errors

echo "🔧 Ultra Low Memory Build Starting..."
echo ""

# Clean previous build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Force garbage collection settings
export NEXT_PRIVATE_WORKERS=1
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS="--max-old-space-size=2048 --max-semi-space-size=32"

echo "📊 Build Configuration:"
echo "   Workers: 1"
echo "   Max Heap: 2GB"
echo "   Semi-Space: 32MB"
echo ""

# Run the build
echo "🚀 Starting Next.js build..."
echo ""

next build

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "Next steps:"
    echo "  1. Test locally: pnpm start"
    echo "  2. Deploy: git push origin main"
else
    echo ""
    echo "❌ Build failed with exit code: $EXIT_CODE"
    echo ""
    echo "Try these alternatives:"
    echo "  1. pnpm build:ultra-low"
    echo "  2. Increase memory: NODE_OPTIONS='--max-old-space-size=3072' pnpm build"
    echo "  3. Check for memory leaks in components"
fi

exit $EXIT_CODE
