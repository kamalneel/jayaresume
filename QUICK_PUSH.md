# Quick Push to GitHub

Since the repository `kamalneel/jayaresume` already exists, follow these steps:

## Step 1: Install Git (if not installed)
Download from: https://git-scm.com/download/win
Install with default settings.

## Step 2: Open PowerShell in this folder
Right-click in the folder → "Open in Terminal" or "Open PowerShell window here"

## Step 3: Copy and paste these commands one by one:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Interactive resume with jazzy pink version"

# Connect to your existing repository
git remote add origin https://github.com/kamalneel/jayaresume.git

# Set branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

## If you get authentication errors:

### Option A: Use Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. When prompted for password, paste the token instead

### Option B: Use GitHub Desktop
1. Download: https://desktop.github.com/
2. File → Add Local Repository
3. Select this folder
4. Click "Publish repository" (it will detect the remote)

## Files being pushed:
- index.html (Jaya's version)
- alicia-version.html (Alicia's jazzy version)
- All CSS and JS files
- Documentation files
- .gitignore

