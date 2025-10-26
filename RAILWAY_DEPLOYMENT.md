# 🚂 Railway Deployment Guide - Finance Dashboard

This guide will walk you through deploying your Finance Dashboard to Railway. You'll deploy two separate services: Backend and Frontend.

## 📋 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Account**: Connect your repository to Railway
3. **Finnhub API Key**: Get free key at [finnhub.io/register](https://finnhub.io/register)

---

## 🚀 Part 1: Deploy Backend Service

### Step 1: Create Backend Project

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select your **Finance** repository
6. Railway will detect it as a Node.js project

### Step 2: Configure Backend Service

1. In Railway dashboard, click on your service
2. Go to **"Settings"** tab
3. Configure the following:

   **Root Directory:**
   ```
   backend
   ```

   **Build Command:**
   ```
   npm install
   ```

   **Start Command:**
   ```
   npm start
   ```

### Step 3: Set Environment Variables

1. Go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add the following variables:

   ```env
   PORT=5000
   NODE_ENV=production
   FINNHUB_API_KEY=your_actual_finnhub_api_key_here
   CORS_ORIGIN=*
   ```

   > **Note**: Replace `your_actual_finnhub_api_key_here` with your real Finnhub API key

### Step 4: Generate Backend Domain

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy the generated URL (e.g., `https://finance-backend-production.up.railway.app`)
5. **SAVE THIS URL** - you'll need it for the frontend!

### Step 5: Deploy Backend

1. Railway will automatically deploy
2. Check **"Deployments"** tab to see progress
3. Once deployed, test your backend:
   - Open: `https://your-backend-url.up.railway.app/api/health`
   - You should see: `{"success": true, "message": "Finance Dashboard API is running"}`

---

## 🎨 Part 2: Deploy Frontend Service

### Step 1: Create Frontend Project

1. In Railway, click **"New Project"** again
2. Select **"Deploy from GitHub repo"**
3. Select the same **Finance** repository
4. This creates a separate service for the frontend

### Step 2: Configure Frontend Service

1. Click on the new service
2. Go to **"Settings"** tab
3. Configure the following:

   **Root Directory:**
   ```
   client
   ```

   **Build Command:**
   ```
   npm install && npm run build
   ```

   **Start Command:**
   ```
   npx serve -s build -l $PORT
   ```

### Step 3: Set Frontend Environment Variables

1. Go to **"Variables"** tab
2. Add the following variables:

   ```env
   NODE_ENV=production
   REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
   ```

   > **IMPORTANT**: Replace `your-backend-url.up.railway.app` with the actual backend URL from Part 1, Step 4

### Step 4: Generate Frontend Domain

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy the generated URL (e.g., `https://finance-dashboard.up.railway.app`)
5. This is your public app URL! 🎉

### Step 5: Deploy Frontend

1. Railway will automatically deploy
2. Check **"Deployments"** tab to see progress
3. Once deployed, visit your frontend URL
4. The app should load and display data

---

## 🔄 Part 3: Update Backend CORS

Now that you have your frontend URL, update the backend to allow requests from it.

### Update Backend Environment Variables

1. Go back to your **Backend service** in Railway
2. Go to **"Variables"** tab
3. Update the `CORS_ORIGIN` variable:

   ```env
   CORS_ORIGIN=https://your-frontend-url.up.railway.app
   ```

   > Replace with your actual frontend URL from Part 2, Step 4

4. Railway will automatically redeploy the backend

---

## ✅ Verification Checklist

### Backend Service ✓
- [ ] Root Directory set to `backend`
- [ ] Environment variables configured:
  - `PORT=5000`
  - `NODE_ENV=production`
  - `FINNHUB_API_KEY=<your_key>`
  - `CORS_ORIGIN=<your_frontend_url>`
- [ ] Domain generated
- [ ] `/api/health` endpoint returns success
- [ ] `/api/crypto` endpoint returns data

### Frontend Service ✓
- [ ] Root Directory set to `client`
- [ ] Build command includes `npm run build`
- [ ] Start command uses `serve`
- [ ] Environment variable `REACT_APP_API_URL` points to backend
- [ ] Domain generated
- [ ] App loads in browser
- [ ] All three sections work (Crypto, Stocks, Currency)

---

## 🧪 Testing Your Deployment

### Test Backend Endpoints

Open these URLs in your browser (replace with your backend URL):

1. **Health Check:**
   ```
   https://your-backend-url.up.railway.app/api/health
   ```

2. **Cryptocurrency Data:**
   ```
   https://your-backend-url.up.railway.app/api/crypto
   ```

3. **Stock Data:**
   ```
   https://your-backend-url.up.railway.app/api/stocks
   ```

4. **Currency Conversion:**
   ```
   https://your-backend-url.up.railway.app/api/currency/USD/EUR
   ```

### Test Frontend

1. Open your frontend URL: `https://your-frontend-url.up.railway.app`
2. Click on each tab:
   - **Crypto**: Should display 20 cryptocurrencies
   - **Stocks**: Should display 20 stocks with prices
   - **Currency**: Should convert between currencies
3. Check browser console for any errors

---

## ⚠️ Common Issues & Solutions

### Issue 1: Frontend can't connect to Backend
**Symptoms:** Frontend shows errors, no data loads

**Solutions:**
1. Check `REACT_APP_API_URL` in frontend environment variables
2. Make sure it includes `/api` at the end
3. Verify backend URL is correct and accessible
4. Check browser console for CORS errors
5. **IMPORTANT:** After changing environment variables, you must **redeploy** the frontend

### Issue 2: CORS Errors
**Symptoms:** Browser console shows "CORS policy" errors

**Solutions:**
1. Update `CORS_ORIGIN` in backend environment variables
2. Set it to your frontend URL: `https://your-frontend-url.up.railway.app`
3. Or temporarily set to `*` for testing: `CORS_ORIGIN=*`
4. Backend will auto-redeploy after changing variables

### Issue 3: Stocks Not Loading
**Symptoms:** Crypto and Currency work, but Stocks show errors

**Solutions:**
1. Check if `FINNHUB_API_KEY` is set in backend environment variables
2. Verify your Finnhub API key is valid
3. Check Finnhub rate limits (60 calls/minute on free tier)
4. View backend logs in Railway for specific errors

### Issue 4: Build Fails
**Symptoms:** Deployment fails during build phase

**Backend Solutions:**
1. Ensure `package.json` is in the `backend` directory
2. Check that all dependencies are listed in `dependencies`
3. Verify Node.js version compatibility

**Frontend Solutions:**
1. Ensure `package.json` is in the `client` directory
2. Check that `serve` package is in dependencies
3. Verify build command is correct: `npm run build`

### Issue 5: App Builds but Won't Start
**Symptoms:** Build succeeds but app crashes on start

**Backend:**
- Check start command is `npm start` or `node server.js`
- Verify `PORT` environment variable is set
- Check Railway logs for error messages

**Frontend:**
- Check start command is `npx serve -s build -l $PORT`
- Verify `build` directory exists after build
- Ensure `serve` package is installed

---

## 📊 Monitoring Your Deployment

### View Logs
1. Go to your service in Railway
2. Click on **"Logs"** tab
3. Watch for errors or warnings
4. Logs update in real-time

### Check Resource Usage
1. Go to **"Metrics"** tab
2. Monitor CPU, Memory, and Network usage
3. Railway free tier includes 500 hours/month

### Redeploy
If you need to manually redeploy:
1. Go to **"Deployments"** tab
2. Click **"Deploy"** button
3. Or make a new commit to trigger auto-deploy

---

## 🔧 Environment Variables Reference

### Backend Variables
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port (Railway sets automatically) | `5000` |
| `NODE_ENV` | Yes | Environment mode | `production` |
| `FINNHUB_API_KEY` | Yes | Finnhub API key for stock data | `your_api_key` |
| `CORS_ORIGIN` | Yes | Allowed frontend URL | `https://your-app.up.railway.app` |

### Frontend Variables
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `REACT_APP_API_URL` | Yes | Backend API URL | `https://your-backend.up.railway.app/api` |

---

## 🔄 Continuous Deployment

Railway automatically deploys when you push to GitHub:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Railway detects the push and automatically redeploys
4. Watch the deployment progress in Railway dashboard

---

## 💰 Railway Pricing

**Hobby Plan (Free):**
- $5 of usage per month
- 500 execution hours
- Perfect for this project!

**Developer Plan ($5/month):**
- $5 credit + $5 usage included
- Higher limits

---

## 📝 Quick Reference

### Your Deployment URLs
After deployment, save these URLs:

- **Backend API**: `https://your-backend-url.up.railway.app`
- **Frontend App**: `https://your-frontend-url.up.railway.app`
- **Backend Health**: `https://your-backend-url.up.railway.app/api/health`

### Key Files for Railway
- `backend/railway.json` - Backend Railway configuration
- `client/railway.json` - Frontend Railway configuration
- `backend/server.js` - Backend entry point
- `client/package.json` - Frontend dependencies & scripts

---

## 🎉 Success!

Your Finance Dashboard is now live on Railway! 

Share your app URL with others:
```
https://your-frontend-url.up.railway.app
```

---

## 🆘 Need Help?

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Finnhub Support**: [finnhub.io/support](https://finnhub.io/support)

---

**Happy Deploying! 🚀**

