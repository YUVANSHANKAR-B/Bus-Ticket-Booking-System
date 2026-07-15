# Bus Ticket Booking System - GitHub Deployment Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Bus-Ticket-Booking-System.git
git push -u origin main
```

### 2. **Configure GitHub Secrets**
In your GitHub repository → Settings → Secrets and variables → Actions, add:

```
VERCEL_TOKEN          → Get from https://vercel.com/account/tokens
VERCEL_ORG_ID         → From Vercel dashboard (optional if personal account)
VERCEL_PROJECT_ID     → From Vercel project settings
```

### 3. **Setup MongoDB**
- Create free account: https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Add to Vercel environment variables:
  - `MONGO_URI`: Your MongoDB connection string
  - `JWT_SECRET`: Generate random string (e.g., `openssl rand -hex 32`)

### 4. **Deploy Backend**
- Go to https://vercel.com and connect your GitHub repository
- Select this project and deploy
- Add environment variables to Vercel

### 5. **Update Frontend API**
Edit `.env.local` or add to your build:
```
REACT_APP_API_BASE_URL=https://your-vercel-backend-url.vercel.app
```

### 6. **Deploy Frontend**
Push to main branch and GitHub Actions automatically deploys to GitHub Pages!

---

## 📊 Project Structure

```
/
├── src/                      # React frontend source
├── backend/                  # Express.js backend
├── public/                   # Static files
├── .github/workflows/        # CI/CD automation
├── vercel.json              # Vercel deployment config
├── DEPLOYMENT.md            # Detailed deployment guide
└── package.json             # Dependencies
```

---

## 🔗 Useful Links

- **Frontend URL**: `https://YOUR-USERNAME.github.io/Bus-Ticket-Booking-System/`
- **Backend API**: `https://your-vercel-app.vercel.app/api/`
- **GitHub Actions**: Repository → Actions tab
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## 📝 Environment Variables

**Frontend (.env.local)**:
```
REACT_APP_API_BASE_URL=https://your-backend-url.vercel.app
```

**Backend (Vercel dashboard)**:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=production
```

---

## ✅ Verification Checklist

- [ ] GitHub repository created and connected
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] Vercel account created and project deployed
- [ ] MongoDB Atlas cluster created
- [ ] GitHub Secrets configured (VERCEL_TOKEN, etc.)
- [ ] Environment variables set in Vercel
- [ ] Frontend API URL updated
- [ ] Test deployment by pushing to main branch

---

## 🆘 Troubleshooting

**Frontend not deploying?**
- Check GitHub Actions tab for errors
- Verify homepage in package.json matches your GitHub URL

**Backend not starting?**
- Verify MongoDB connection string (MONGO_URI)
- Check JWT_SECRET is set
- Review Vercel logs

**CORS errors?**
- Update backend CORS to include frontend URL
- Ensure frontend uses correct API URL

**API calls failing?**
- Check frontend REACT_APP_API_BASE_URL env variable
- Verify backend is running on Vercel

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
