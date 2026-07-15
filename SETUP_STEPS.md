# Step-by-Step GitHub Deployment Guide

## 📋 Prerequisites
- [x] Node.js installed locally
- [x] Git installed
- [x] GitHub account
- [x] Vercel account (free tier available)
- [x] MongoDB Atlas account (free tier available)

---

## Phase 1: Local Setup & GitHub Repository

### Step 1: Initialize Git Repository (if not already done)
```bash
cd "d:\Bus Ticket Booking System Using React Js - Copy\bus-ticket-booking-system"
git init
git add .
git commit -m "Initial commit: Bus Ticket Booking System"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `Bus-Ticket-Booking-System`
3. Description: "Bus Ticket Booking System built with React and Node.js"
4. Choose Public (for GitHub Pages)
5. Click "Create repository"

### Step 3: Connect Local Repository to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Bus-Ticket-Booking-System.git
git push -u origin main
```

### Verify ✓
- See your code on GitHub.com

---

## Phase 2: GitHub Pages Setup (Frontend)

### Step 4: Enable GitHub Pages
1. Go to your GitHub repository
2. Settings → Pages
3. Branch: `gh-pages` (created automatically by GitHub Actions)
4. Folder: `/ (root)`
5. Click Save

### Step 5: Update Homepage URL in package.json
Edit `package.json`:
```json
"homepage": "https://your-username.github.io/Bus-Ticket-Booking-System/"
```
Replace `your-username` with your actual GitHub username.

```bash
git add package.json
git commit -m "Update homepage URL for GitHub Pages"
git push origin main
```

### Verify ✓
- Go to GitHub Actions tab
- "Deploy to GitHub Pages" workflow runs automatically
- After ~2 minutes, frontend appears at your GitHub Pages URL

---

## Phase 3: Backend Setup (MongoDB & Vercel)

### Step 6: Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create new project: "Bus-Ticket-Booking"
4. Click "Build a Database"
5. Select Free tier (M0)
6. Choose cloud provider and region
7. Create cluster (takes ~5 minutes)

### Step 7: MongoDB Connection String
1. In MongoDB Atlas, click "Connect"
2. Choose "Drivers" → Node.js
3. Copy connection string (looks like: `mongodb+srv://username:password@...`)
4. **Save this** - you'll need it soon

### Step 8: Create Vercel Account & Project
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select framework preset: **Other** (or Node.js)
6. Configure build:
   - Build command: `npm run build`
   - Output: `build`
7. Click Deploy

### Verify ✓
- Vercel provides a .vercel.app URL for your backend
- **Save this URL** - looks like: `https://your-project.vercel.app`

---

## Phase 4: Environment Variables Configuration

### Step 9: Add GitHub Secrets
**For automatic backend deployment via GitHub Actions:**

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these secrets:

| Secret Name | Value | Where to Find |
|---|---|---|
| `VERCEL_TOKEN` | Personal access token | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Your Vercel org ID | Vercel dashboard (Settings) |
| `VERCEL_PROJECT_ID` | Project ID | Vercel project settings |

**To get these values:**
- `VERCEL_TOKEN`: Visit https://vercel.com/account/tokens → Create token → Copy
- `VERCEL_ORG_ID`: In Vercel dashboard, check under Settings or profile
- `VERCEL_PROJECT_ID`: In Vercel, go to project Settings → General → Project ID

### Step 10: Add Environment Variables to Vercel
1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add:

| Key | Value |
|---|---|
| `MONGO_URI` | Your MongoDB connection string from Step 7 |
| `JWT_SECRET` | Generate: `openssl rand -hex 32` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

### Step 11: Configure Frontend API Connection
Create `.env.local` in your project root:
```
REACT_APP_API_BASE_URL=https://your-project.vercel.app
```
Replace with your actual Vercel URL from Step 8.

```bash
git add .env.local
git commit -m "Add API configuration"
git push origin main
```

### Verify ✓
- Frontend shows no CORS errors
- API calls work (check browser console)

---

## Phase 5: Testing & Verification

### Step 12: Test Deployment
1. Make a small change to frontend code
2. Commit and push to main:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Check GitHub Actions tab - workflows should run
4. After 2 minutes, check:
   - Frontend: https://your-username.github.io/Bus-Ticket-Booking-System/
   - Backend: https://your-project.vercel.app/api/health

### Step 13: Verify Full Application
Test these features:
- [ ] Frontend loads and is responsive
- [ ] Can see bus search page
- [ ] Can register new account
- [ ] Can login
- [ ] Can book tickets
- [ ] Can see booking confirmation

---

## 🔗 Your Live URLs

- **Frontend**: `https://your-username.github.io/Bus-Ticket-Booking-System/`
- **Backend API**: `https://your-project.vercel.app/api/`
- **GitHub Repo**: `https://github.com/your-username/Bus-Ticket-Booking-System`

---

## 🚨 Common Issues & Solutions

### Issue: Frontend shows blank page
**Solution:** 
- Check browser console for errors (F12 → Console)
- Verify `REACT_APP_API_BASE_URL` is correct
- Check GitHub Pages deployment in Actions tab

### Issue: API calls fail (CORS error)
**Solution:**
- Verify backend is running on Vercel
- Check `MONGO_URI` in Vercel is correct
- Update frontend API URL to match Vercel URL

### Issue: Login/Registration not working
**Solution:**
- Check MongoDB connection (Vercel logs)
- Verify `JWT_SECRET` is set
- Check network requests in browser DevTools (F12 → Network)

### Issue: GitHub Actions workflow fails
**Solution:**
- Click on the failed workflow
- Check "Run" logs for specific error
- Verify secrets are set correctly
- Check that branch is `main` or `master`

---

## 📞 Need Help?

1. **GitHub Actions Logs**: Repository → Actions tab → Click failed workflow → View logs
2. **Vercel Logs**: Vercel dashboard → Project → Deployments tab → Click deployment → View logs
3. **Check these files**:
   - `.github/workflows/deploy.yml` (frontend)
   - `.github/workflows/backend-deploy.yml` (backend)
   - `vercel.json` (Vercel configuration)

---

## ✅ Final Checklist

- [ ] GitHub repository created
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled
- [ ] Frontend deployed successfully
- [ ] MongoDB Atlas cluster created
- [ ] Vercel project created and deployed
- [ ] GitHub Secrets added (VERCEL_TOKEN, etc.)
- [ ] Vercel Environment Variables set (MONGO_URI, JWT_SECRET)
- [ ] Frontend API URL updated and deployed
- [ ] Frontend is live and functional
- [ ] Backend API is responding
- [ ] Full application testing complete

---

🎉 **Congratulations!** Your Bus Ticket Booking System is now live on GitHub!
