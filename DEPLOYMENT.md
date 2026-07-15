# Deployment Guide

## GitHub Actions Setup

This project is configured for automated deployment using GitHub Actions.

### Prerequisites

1. **GitHub Repository**: Fork/clone this project to your GitHub account
2. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)
3. **MongoDB Atlas Account**: Create a free account at [mongodb.com/cloud](https://www.mongodb.com/cloud/atlas)

### Step 1: Frontend Deployment (GitHub Pages)

The frontend automatically deploys to GitHub Pages on every push to `main` branch.

1. Go to your repository settings → Pages
2. Select "GitHub Actions" as the deployment method
3. Ensure the homepage in `package.json` matches your GitHub username:
   ```json
   "homepage": "https://your-username.github.io/Bus-Ticket-Booking-System/"
   ```

### Step 2: Backend Deployment (Vercel)

1. **Create Vercel Project**:
   - Visit [vercel.com](https://vercel.com) and create an account
   - Connect your GitHub repository
   - Create a new project from this repository

2. **Add GitHub Secrets** (for automated backend deployment):
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Get from [vercel.com/account/tokens](https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID`: Found in Vercel dashboard
     - `VERCEL_PROJECT_ID`: Found in Vercel project settings

3. **Configure Environment Variables in Vercel**:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT tokens
   - Any other backend environment variables

### Step 3: MongoDB Setup

1. Create a free MongoDB Atlas cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user and get the connection string
3. Add the connection string to Vercel environment variables as `MONGO_URI`

### Step 4: Update Frontend API URL

Update the `.env.local` file (or set in your build process):
```
REACT_APP_API_BASE_URL=https://your-vercel-backend-url.vercel.app
```

### GitHub Actions Workflows

Two workflows are included:

1. **deploy.yml**: Deploys frontend to GitHub Pages
   - Runs on: push to `main`/`master`, pull requests
   - Builds React app and deploys to GitHub Pages

2. **backend-deploy.yml**: Deploys backend to Vercel
   - Runs on: push to `main`/`master` (when backend files change)
   - Deploys Node.js backend to Vercel

### Manual Deployment

**Frontend (GitHub Pages)**:
```bash
npm install
npm run predeploy
npm run deploy
```

**Backend (Vercel)**:
```bash
vercel login
vercel --prod
```

### Troubleshooting

- **Pages not building**: Check GitHub Actions tab → Workflows for errors
- **Backend connection fails**: Verify `MONGO_URI` and `JWT_SECRET` in Vercel
- **CORS errors**: Update backend CORS configuration with your frontend URL
- **Authentication issues**: Ensure Vercel tokens are set correctly in GitHub Secrets

## Environment Variables Checklist

- [ ] Frontend: `REACT_APP_API_BASE_URL` set to Vercel backend URL
- [ ] Backend: `MONGO_URI` set to MongoDB Atlas connection string
- [ ] Backend: `JWT_SECRET` set to a secure random string
- [ ] Vercel: All backend environment variables configured
- [ ] GitHub: All required secrets added for CI/CD
