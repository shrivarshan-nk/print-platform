# 🚀 Quick Start Guide - Admin Dashboard

## One-Time Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

The default configuration should work for local development.

## Running Locally

### Terminal 1: Backend (Python)
```bash
cd backend
# Activate virtual environment if needed
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

### Terminal 2: Frontend (Next.js)
```bash
cd frontend
npm run dev
```

### Access the Dashboard
Open your browser: **[http://localhost:3000](http://localhost:3000)**

The dashboard will:
1. Automatically redirect to `/admin`
2. Show the Dashboard page with statistics
3. Allow you to manage campuses and shops

## 📖 File Organization

### Key Files to Know
- **Dashboard**: `/src/pages/dashboard/DashboardPage.tsx`
- **Campuses**: `/src/pages/campuses/CampusesPage.tsx`
- **Shops**: `/src/pages/shops/ShopsPage.tsx`
- **Services**: `/src/services/` (API calls)
- **Context**: `/src/contexts/` (State management)
- **Components**: `/src/shared/components/` (Reusable UI)

### Adding a New Page

1. Create folder: `src/pages/mypage/`
2. Create component: `src/pages/mypage/MyPage.tsx`
3. Create route: `app/admin/mypage/page.tsx`
4. Add to sidebar in `src/shared/components/AdminLayout.tsx`

## 🎯 Main Features

### Dashboard
- View statistics (campuses, shops, distribution)
- Quick overview of execution modes

### Campuses
- Add new campus
- Edit campus details
- Delete campus
- View all campuses

### Shops
- Add new shop
- Configure execution mode (Manual/Assisted/Auto)
- Set payment mode
- Filter by execution type
- Edit/delete shops

## 🔧 Troubleshooting

### Issue: API Connection Failed
**Solution**: Ensure backend is running on `http://localhost:8000`
```bash
# Check backend is accessible
curl http://localhost:8000/health
```

### Issue: Module Not Found
**Solution**: Clear node_modules and reinstall
```bash
npm install
```

### Issue: Port Already in Use
**Solution**: Change port in package.json or kill process
```bash
# Frontend on different port
npm run dev -- -p 3001

# Kill backend on port 8000
lsof -ti :8000 | xargs kill -9
```

## 📝 Common Tasks

### Add New Campus
1. Click "Add Campus" button
2. Enter name and location
3. Click "Create"

### Add New Shop
1. Click "Add Shop" button
2. Select campus
3. Enter shop name
4. Choose execution mode:
   - **Manual**: Staff prints manually
   - **Assisted**: Desktop helper
   - **Auto**: Fully automated
5. Choose payment mode
6. Click "Create"

### Filter Shops by Execution Mode
Use toggle buttons at the top of Shops page:
- All Shops
- ✍️ Manual
- ⚙️ Assisted
- 🚀 Auto

## 🎨 Customization

### Change Colors
Edit `app/layout.tsx`:
```tsx
const theme = createTheme({
  palette: {
    primary: { main: '#YOUR_COLOR' },
    secondary: { main: '#YOUR_COLOR' },
  },
});
```

### Change API URL
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api.com
```

## 📦 Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Run production
npm start

# Lint code
npm run lint
```

## 🔌 API Endpoints Used

The dashboard communicates with these backend endpoints:

| Method | Endpoint | Action |
|--------|----------|--------|
| GET | `/api/campuses` | List all campuses |
| POST | `/api/campuses` | Create campus |
| PATCH | `/api/campuses/{id}` | Update campus |
| DELETE | `/api/campuses/{id}` | Delete campus |
| GET | `/api/shops` | List all shops |
| POST | `/api/shops` | Create shop |
| PATCH | `/api/shops/{id}` | Update shop |
| DELETE | `/api/shops/{id}` | Delete shop |

## 💡 Pro Tips

1. **Hot Reload**: Changes automatically refresh in browser
2. **DevTools**: Use React Developer Tools browser extension
3. **Network**: Check Network tab in browser dev tools for API calls
4. **Console**: Check browser console for errors

## 🆘 Getting Help

### Check These First
1. Is backend running? (`http://localhost:8000/health`)
2. Are dependencies installed? (`npm ls`)
3. Is `.env.local` configured? (Check API_URL)
4. Are there any error messages in console?

### Common Errors

**Error: "Failed to fetch campuses"**
- Backend is not running
- API URL is incorrect
- CORS is not configured

**Error: "Campus name is required"**
- Fill in all form fields
- Form validation requires all inputs

**Error: "Module X not found"**
- Run `npm install`
- Clear `.next` folder: `rm -rf .next`

## 📚 Next Steps

1. **Test the UI** with the backend running
2. **Explore the code** understand the structure
3. **Add new features** by following the patterns
4. **Deploy** when ready

## 🎉 You're All Set!

Your admin dashboard is ready to use. Happy building! 🚀
