# 🔧 Railway Deployment Troubleshooting

## Common Railway Deployment Issues & Solutions

---

## ❌ Issue 1: npm ci fails - package-lock.json out of sync

### Error Message:
```
npm error `npm ci` can only install packages when your package.json 
and package-lock.json are in sync.
npm error Missing: serve@14.2.5 from lock file
```

### ✅ Solution:
This has been fixed! We created `nixpacks.toml` files that force Railway to use `npm install` instead of `npm ci`.

**Files added:**
- `backend/nixpacks.toml`
- `client/nixpacks.toml`

**What to do:**
1. Commit and push these new files:
   ```bash
   git add backend/nixpacks.toml client/nixpacks.toml
   git commit -m "Add nixpacks config to fix Railway build"
   git push
   ```
2. Railway will auto-redeploy with the fix

---

## ❌ Issue 2: Frontend can't connect to Backend

### Error Message:
Browser console shows: `Failed to fetch` or `Network Error`

### ✅ Solution:
Check your `REACT_APP_API_URL` environment variable in Railway.

**It must include:**
- Protocol: `https://`
- Domain: `your-backend-url.up.railway.app`
- Path: `/api`

**Correct format:**
```env
REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
```

**Wrong formats:**
```env
❌ REACT_APP_API_URL=your-backend-url.up.railway.app
❌ REACT_APP_API_URL=https://your-backend-url.up.railway.app
❌ REACT_APP_API_URL=http://localhost:5000/api
```

**After fixing:**
1. Update the environment variable in Railway
2. Manually redeploy the frontend (Railway doesn't auto-redeploy on env var changes for frontend)

---

## ❌ Issue 3: CORS Policy Error

### Error Message:
```
Access to fetch at 'https://backend...' from origin 'https://frontend...' 
has been blocked by CORS policy
```

### ✅ Solution:
Update backend `CORS_ORIGIN` environment variable:

1. Go to Backend service in Railway
2. Update `CORS_ORIGIN` variable:
   ```env
   CORS_ORIGIN=https://your-frontend-url.up.railway.app
   ```
3. Backend will auto-redeploy
4. Test your app again

**Temporary workaround:**
```env
CORS_ORIGIN=*
```
(Not recommended for production)

---

## ❌ Issue 4: Stocks Tab Shows Error

### Error Message:
"Missing API key" or "Failed to fetch stock data"

### ✅ Solution:
1. Get Finnhub API key from [finnhub.io/register](https://finnhub.io/register)
2. Add to Backend environment variables:
   ```env
   FINNHUB_API_KEY=your_actual_key_here
   ```
3. Backend will auto-redeploy

---

## ❌ Issue 5: Build succeeds but app won't start

### Error Message:
"Application failed to respond" or "Port bind error"

### ✅ Solution (Frontend):
Make sure start command is:
```
npx serve -s build -p $PORT
```

Note the `-p $PORT` (not `-l $PORT`)

### ✅ Solution (Backend):
Make sure:
1. Start command is `npm start`
2. `PORT` environment variable is set (Railway sets this automatically)
3. Backend is listening on `process.env.PORT`

---

## ❌ Issue 6: Changes not showing up

### Issue:
Pushed changes to GitHub but Railway shows old version

### ✅ Solution:
1. Check Railway is watching the correct branch (usually `main` or `master`)
2. Manually trigger deployment:
   - Go to service in Railway
   - Click "Deployments" tab
   - Click "Deploy" button
3. For environment variable changes in frontend:
   - Must manually redeploy (Railway doesn't auto-redeploy frontend on env changes)

---

## ❌ Issue 7: Root Directory Error

### Error Message:
"Could not find package.json"

### ✅ Solution:
Check Railway settings:
- **Backend service:** Root Directory = `backend`
- **Frontend service:** Root Directory = `client`

**How to fix:**
1. Go to service in Railway
2. Click "Settings" tab
3. Find "Root Directory" field
4. Set correct path
5. Redeploy

---

## ❌ Issue 8: Build takes too long / times out

### Issue:
Build exceeds time limit

### ✅ Solution:
Railway free tier has build time limits. Optimize:

**Frontend:**
1. Make sure `node_modules` is in `.gitignore` (don't commit it)
2. Build command should be: `npm install && npm run build`

**Backend:**
1. Make sure `node_modules` is in `.gitignore`
2. Remove any unnecessary dependencies

---

## ❌ Issue 9: 404 Not Found on frontend routes

### Issue:
App loads but shows 404 on refresh or navigation

### ✅ Solution:
The `serve` package handles this automatically with `-s` flag.

Make sure start command is:
```
npx serve -s build -p $PORT
```

The `-s` flag enables SPA (Single Page App) mode.

---

## ❌ Issue 10: Out of Railway credits

### Error Message:
"Usage limit exceeded"

### ✅ Solution:
Railway free tier includes $5/month credit.

**Check usage:**
1. Go to Railway dashboard
2. Check "Usage" section
3. See which service is using the most

**Optimization:**
- Both services running 24/7 should stay within free tier
- If over limit, upgrade to Developer plan ($5/month)

---

## 🔍 General Debugging Steps

### 1. Check Logs
```
Railway → Service → Logs tab
```
Look for error messages in real-time logs.

### 2. Check Environment Variables
```
Railway → Service → Variables tab
```
Verify all required variables are set.

### 3. Check Build Logs
```
Railway → Service → Deployments tab → Click on deployment
```
See detailed build output.

### 4. Test Endpoints Directly
**Backend health check:**
```
https://your-backend-url.up.railway.app/api/health
```

**Backend crypto data:**
```
https://your-backend-url.up.railway.app/api/crypto
```

### 5. Check Browser Console
```
F12 → Console tab
```
Look for JavaScript errors or network errors.

---

## 📚 Quick Reference

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=production
FINNHUB_API_KEY=your_key_here
CORS_ORIGIN=https://your-frontend-url.up.railway.app
```

### Frontend Environment Variables
```env
NODE_ENV=production
REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
```

### Railway Service Settings

**Backend:**
- Root Directory: `backend`
- Build Command: (auto-detected)
- Start Command: `npm start`

**Frontend:**
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Start Command: `npx serve -s build -p $PORT`

---

## 🆘 Still Having Issues?

1. **Check the logs** - Most issues are visible in Railway logs
2. **Review this guide** - Most common issues are covered here
3. **Railway Discord** - [discord.gg/railway](https://discord.gg/railway)
4. **Railway Docs** - [docs.railway.app](https://docs.railway.app)

---

## ✅ Deployment Checklist

Use this to verify everything is correct:

- [ ] Both services deployed successfully
- [ ] Backend health endpoint returns success
- [ ] Frontend loads in browser
- [ ] All three tabs work (Crypto, Stocks, Currency)
- [ ] No CORS errors in console
- [ ] Data refreshes automatically
- [ ] Mobile view works

---

**Good luck! 🚀**

