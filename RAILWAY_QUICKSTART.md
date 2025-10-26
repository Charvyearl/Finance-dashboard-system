# 🚂 Railway Quick Start - Finance Dashboard

## 📝 TL;DR - Deploy in 10 Minutes

### Prerequisites
- Railway account ([railway.app](https://railway.app))
- GitHub repository connected
- Finnhub API key ([finnhub.io/register](https://finnhub.io/register))

---

## 🎯 Backend Deployment (5 minutes)

1. **Create Project**
   - Railway → New Project → Deploy from GitHub repo
   - Select your Finance repository

2. **Configure Settings**
   - Root Directory: `backend`
   - Start Command: `npm start`

3. **Set Variables**
   ```env
   PORT=5000
   NODE_ENV=production
   FINNHUB_API_KEY=d3hvev1r01qr304fn19gd3hvev1r01qr304fn1a0
   CORS_ORIGIN=*
   ```

4. **Generate Domain**
   - Settings → Generate Domain
   - Copy URL (e.g., `https://backend-xyz.up.railway.app`)

5. **Verify**
   - Visit: `https://your-backend-url.up.railway.app/api/health`

---

## 🎨 Frontend Deployment (5 minutes)

1. **Create Project**
   - Railway → New Project → Deploy from GitHub repo
   - Select your Finance repository (again)

2. **Configure Settings**
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s build -l $PORT`

3. **Set Variables**
   ```env
   NODE_ENV=production
   REACT_APP_API_URL=https://finance-dashboard-system-production.up.railway.app/api
   ```
   *(Use your backend URL from step above - must include https:// and /api)*

4. **Generate Domain**
   - Settings → Generate Domain
   - Copy URL (e.g., `https://finance-xyz.up.railway.app`)

5. **Visit Your App!**
   - Open the frontend URL in browser
   - Test all three sections

---

## 🔄 Final Step: Update CORS

1. Go back to **Backend service**
2. Update `CORS_ORIGIN` variable:
   ```env
   CORS_ORIGIN=https://your-frontend-url.up.railway.app
   ```
3. Railway auto-redeploys

---

## ✅ Checklist

**Backend:**
- [ ] Root: `backend`
- [ ] Variables: PORT, NODE_ENV, FINNHUB_API_KEY, CORS_ORIGIN
- [ ] Domain generated
- [ ] `/api/health` works

**Frontend:**
- [ ] Root: `client`
- [ ] Variable: REACT_APP_API_URL points to backend
- [ ] Domain generated
- [ ] App loads and displays data

---

## 🆘 Common Issues

**Frontend can't connect?**
- Check `REACT_APP_API_URL` is correct
- Must include `/api` at the end
- Redeploy after changing env vars

**CORS errors?**
- Update backend `CORS_ORIGIN` with frontend URL
- Or use `*` for testing

**No stock data?**
- Verify `FINNHUB_API_KEY` is set
- Check key is valid at finnhub.io

---

## 📚 Need More Details?

See full guide: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

---

**That's it! Your Finance Dashboard is live! 🎉**

