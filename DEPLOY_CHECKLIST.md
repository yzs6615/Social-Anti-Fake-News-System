# Vercel Deployment Checklist

## Before Deployment

1. **Ensure all files are committed to Git:**
   ```bash
   git status
   git add index.html script.js styles.css vercel.json package.json
   git commit -m "Add all static files"
   git push
   ```

2. **Verify files exist in repository:**
   - index.html
   - script.js
   - styles.css
   - vercel.json
   - package.json

## Vercel Deployment Steps

1. **Go to Vercel Dashboard**
2. **Import your Git repository**
3. **Configure Project Settings:**
   - Framework Preset: **Other**
   - Root Directory: **./** (root)
   - Build Command: **Leave empty or set to:** `echo "No build needed"`
   - Output Directory: **Leave empty** (Vercel will auto-detect)
   - Install Command: **Leave empty**

4. **Deploy**

## Verify Deployment

1. **Check Vercel Deployment Logs:**
   - Go to your project in Vercel
   - Click on the deployment
   - Check the build logs
   - Verify that files are being uploaded

2. **Check File Structure in Vercel:**
   - In Vercel dashboard, go to your project
   - Check if all files are present in the deployment

3. **Test in Browser:**
   - Open your deployed URL
   - Open Developer Tools (F12)
   - Check Console for errors
   - Check Network tab to see which files are failing

## Troubleshooting

If files still return 404:

1. **Check file paths are correct:**
   - script.js (not ./script.js or /script.js)
   - styles.css (not ./styles.css or /styles.css)

2. **Verify files are in root directory:**
   - Not in a subdirectory
   - Not in a build folder

3. **Check Vercel project settings:**
   - Root Directory should be empty or "."
   - Framework should be "Other" or "None"
   - No build command needed

4. **Manual file check:**
   - Visit: `https://your-domain.vercel.app/script.js`
   - Visit: `https://your-domain.vercel.app/styles.css`
   - These should return the file contents, not 404

