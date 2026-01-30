#!/bin/bash

# Script to remove framer-motion imports and usage from all components
# This is a temporary fix to reduce build memory usage

echo "Removing framer-motion imports from components..."

# Find all files with framer-motion imports
files=$(grep -rl "framer-motion" components/ app/ 2>/dev/null | grep -E '\.(tsx|ts)$')

for file in $files; do
    echo "Processing: $file"
    
    # Remove import statements
    sed -i '' '/import.*framer-motion/d' "$file"
    sed -i '' '/import.*motion/d' "$file"
    
    # Replace motion.div with div (simple cases)
    sed -i '' 's/<motion\.div/<div/g' "$file"
    sed -i '' 's/<\/motion\.div>/<\/div>/g' "$file"
    
    # Replace motion.button with button
    sed -i '' 's/<motion\.button/<button/g' "$file"
    sed -i '' 's/<\/motion\.button>/<\/button>/g' "$file"
    
    # Replace motion.span with span
    sed -i '' 's/<motion\.span/<span/g' "$file"
    sed -i '' 's/<\/motion\.span>/<\/span>/g' "$file"
    
    echo "  ✓ Cleaned $file"
done

echo ""
echo "✅ Framer Motion removed from all components!"
echo ""
echo "Note: You may need to manually fix complex motion animations."
echo "Consider using CSS animations or Tailwind animate classes instead."
