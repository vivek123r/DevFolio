# GitHub Pages Deployment Guide

## Repository Information
- Repository: https://github.com/vivek123r/DevFolio
- GitHub Pages URL: https://vivek123r.github.io/DevFolio/

## Prerequisites
1. Your code is already in the GitHub repository at https://github.com/vivek123r/DevFolio
2. You have push access to the repository

## Deployment Steps

### 1. Verify Git Remote
Check your git remote is correctly set:
```bash
git remote -v
```
Should show: `origin  https://github.com/vivek123r/DevFolio.git`

### 2. Deploy to GitHub Pages
Run the deployment command:
```bash
npm run deploy
```

This will:
- Build your React app for production
- Create a `gh-pages` branch
- Push the built files to the `gh-pages` branch

### 3. Enable GitHub Pages
1. Go to https://github.com/vivek123r/DevFolio
2. Navigate to Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Choose the `gh-pages` branch
5. Select `/ (root)` folder
6. Click Save

### 4. Access Your Site
Your portfolio will be available at: https://vivek123r.github.io/DevFolio/

## Scripts Added
- `npm run build:client` - Builds only the client for production
- `npm run predeploy` - Automatically runs before deploy
- `npm run deploy` - Deploys to GitHub Pages

## Configuration Changes Made
1. **Vite Config**: Added base path `/josu-portfolio/` for production
2. **Build Output**: Changed to `dist` folder for GitHub Pages compatibility
3. **Package.json**: Added deployment scripts using gh-pages

## Troubleshooting
- If deployment fails, ensure you have push access to the repository
- Make sure the repository name matches the desired URL
- Check that GitHub Pages is enabled in repository settings
