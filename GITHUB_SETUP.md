# GitHub Setup Instructions

## Option 1: Using GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Navigate to: `C:\Users\jayaa\OneDrive\Desktop\AI Project-JA`
5. Click "Publish repository" and select `kamalneel/jayaresume`
6. Click "Publish Repository"

## Option 2: Using Git Command Line

### Step 1: Install Git
Download Git for Windows: https://git-scm.com/download/win

### Step 2: Open Git Bash or PowerShell in the project folder

### Step 3: Run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive resume for Jaya Agrawal"

# Add remote repository
git remote add origin https://github.com/kamalneel/jayaresume.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Option 3: Using VS Code (If you have it)

1. Open VS Code in the project folder
2. Open the Source Control panel (Ctrl+Shift+G)
3. Click "Initialize Repository"
4. Stage all files (click + next to "Changes")
5. Enter commit message: "Initial commit: Interactive resume"
6. Click "Commit"
7. Click "..." → "Publish to GitHub"
8. Select the repository: `kamalneel/jayaresume`

## Files to Push

The following files will be pushed:
- `index.html` - Main resume (Jaya's version)
- `alicia-version.html` - Jazzy pink version (Alicia's version)
- `styles.css` - Main stylesheet
- `alicia-styles.css` - Jazzy pink stylesheet
- `script.js` - Main JavaScript
- `alicia-script.js` - Jazzy pink JavaScript
- `README.md` - Project documentation
- `DEPLOY.md` - Deployment guide
- `RESUME_ANALYSIS.md` - Resume analysis
- `.gitignore` - Git ignore file

Note: PDF and DOCX files are in .gitignore but you can add them if needed.

## After Pushing

Once pushed, your resume will be available at:
- Repository: https://github.com/kamalneel/jayaresume
- You can then deploy to Netlify/Vercel for a live URL

