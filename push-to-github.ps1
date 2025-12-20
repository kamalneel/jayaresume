# PowerShell script to push to GitHub
# Run this after installing Git

Write-Host "🚀 Setting up GitHub repository..." -ForegroundColor Cyan

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

# Initialize git if not already done
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing git repository..." -ForegroundColor Cyan
    git init
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Add all files
Write-Host "📝 Adding files..." -ForegroundColor Cyan
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Creating commit..." -ForegroundColor Cyan
    git commit -m "Initial commit: Interactive resume for Jaya Agrawal with jazzy pink version"
} else {
    Write-Host "ℹ️  No changes to commit" -ForegroundColor Yellow
}

# Check if remote exists
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Cyan
    git remote add origin https://github.com/kamalneel/jayaresume.git
} else {
    Write-Host "✅ Remote already configured: $remote" -ForegroundColor Green
    Write-Host "🔄 Updating remote URL..." -ForegroundColor Cyan
    git remote set-url origin https://github.com/kamalneel/jayaresume.git
}

# Set branch to main
Write-Host "🌿 Setting branch to main..." -ForegroundColor Cyan
git branch -M main

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "⚠️  You may be prompted for GitHub credentials" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Repository: https://github.com/kamalneel/jayaresume" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "   1. Authentication required - use GitHub Desktop or set up SSH keys" -ForegroundColor Yellow
    Write-Host "   2. Repository doesn't exist - create it on GitHub first" -ForegroundColor Yellow
    Write-Host "   3. Permission denied - check repository access" -ForegroundColor Yellow
}

