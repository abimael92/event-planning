#!/bin/bash

# Verification Script for Import Fixes
# Checks that all imports are valid and path aliases work

set -e

echo "🔍 Verifying Import Fixes..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
ERRORS=0

# Function to check imports
check_imports() {
    local file=$1
    local pattern=$2
    local description=$3
    
    if grep -q "$pattern" "$file" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $description"
    else
        echo -e "${RED}✗${NC} $description"
        ((ERRORS++))
    fi
}

# Function to check no pattern exists
check_no_pattern() {
    local file=$1
    local pattern=$2
    local description=$3
    
    if ! grep -q "$pattern" "$file" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $description"
    else
        echo -e "${RED}✗${NC} $description - Pattern still exists!"
        ((ERRORS++))
    fi
}

echo "1️⃣  Checking tsconfig.json path aliases..."
check_imports "tsconfig.json" '"@/\*": \["\./\*"\]' "  @/* points to root"
check_imports "tsconfig.json" '"@/lib/\*": \["./app/shared/lib/\*"\]' "  @/lib/* points to app/shared/lib/*"
check_imports "tsconfig.json" '"@/ui/\*": \["./components/ui/\*"\]' "  @/ui/* points to components/ui/*"
check_no_pattern "tsconfig.json" '"@/\*": \["./src/\*"\]' "  No reference to non-existent src/"
echo ""

echo "2️⃣  Checking fixed imports..."
check_imports "app/dashboard/events/page.tsx" "import.*Progress.*from.*@/components/ui/progress" "  Progress imported in events page"
check_imports "app/dashboard/payments/page.tsx" "import.*motion.*from.*framer-motion" "  motion imported in payments page"
echo ""

echo "3️⃣  Checking fixed JSX syntax..."
check_no_pattern "app/login/page.tsx" "< AuthSection" "  No space in JSX tag (< AuthSection)"
check_imports "app/login/page.tsx" "<AuthSection />" "  Correct JSX syntax (<AuthSection />)"
echo ""

echo "4️⃣  Running TypeScript type check..."
if pnpm type-check 2>&1 | grep -q "error TS"; then
    echo -e "${RED}✗${NC} TypeScript errors found"
    echo ""
    echo "TypeScript errors:"
    pnpm type-check 2>&1 | grep "error TS" | head -10
    ((ERRORS++))
else
    echo -e "${GREEN}✓${NC} TypeScript type check passed"
fi
echo ""

echo "5️⃣  Checking for common import issues..."

# Check for broken @/lib imports (should now work)
if grep -r "from ['\"]@/lib" --include="*.tsx" --include="*.ts" app/ components/ hooks/ 2>/dev/null | grep -v node_modules | grep -v ".next" | head -1; then
    echo -e "${YELLOW}ℹ${NC}  Found @/lib imports (should work now with fixed path alias)"
else
    echo -e "${GREEN}✓${NC} No @/lib imports found (or all working)"
fi

# Check for motion usage without import
echo ""
echo "Checking for motion usage without import..."
FILES_WITH_MOTION=$(grep -l "motion\." --include="*.tsx" --include="*.ts" -r app/ components/ 2>/dev/null | grep -v node_modules | grep -v ".next" || true)

if [ -n "$FILES_WITH_MOTION" ]; then
    for file in $FILES_WITH_MOTION; do
        if ! grep -q "from ['\"]framer-motion['\"]" "$file"; then
            echo -e "${RED}✗${NC} $file uses motion but doesn't import it"
            ((ERRORS++))
        fi
    done
    
    if [ $ERRORS -eq 0 ]; then
        echo -e "${GREEN}✓${NC} All files using motion have the import"
    fi
else
    echo -e "${GREEN}✓${NC} No motion usage found or all imports correct"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run: pnpm build"
    echo "  2. Run: pnpm dev"
    echo "  3. Test the application"
    exit 0
else
    echo -e "${RED}❌ Found $ERRORS error(s)${NC}"
    echo ""
    echo "Please fix the errors above and run this script again."
    exit 1
fi
