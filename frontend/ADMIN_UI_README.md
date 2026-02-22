# Campus Print Management - Frontend UI

Modern admin dashboard for managing campus print shops, built with Next.js, Material-UI, and Framer Motion.

## 🏗 Project Structure

```
frontend/
├── app/                          # Next.js app directory
│   ├── admin/                   # Admin area (protected)
│   │   ├── page.tsx            # Dashboard
│   │   ├── campuses/           # Campuses management pages
│   │   ├── shops/              # Shops management pages
│   │   └── layout.tsx          # Admin layout wrapper
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Landing page (redirects to /admin)
│
├── src/
│   ├── pages/                  # Page components
│   │   ├── dashboard/          # Dashboard page
│   │   ├── campuses/           # Campus management
│   │   │   ├── components/     # Campus-specific components
│   │   │   └── CampusesPage.tsx
│   │   └── shops/              # Shop management
│   │       ├── components/     # Shop-specific components
│   │       └── ShopsPage.tsx
│   │
│   ├── shared/                 # Reusable components
│   │   └── components/
│   │       ├── buttons/        # Reusable buttons
│   │       ├── cards/          # Reusable cards
│   │       ├── modals/         # Reusable modals
│   │       ├── AdminLayout.tsx # Main layout with sidebar
│   │       └── index.ts        # Barrel export
│   │
│   ├── services/               # API services
│   │   ├── campusService.ts   # Campus API calls
│   │   ├── shopService.ts     # Shop API calls
│   │   └── index.ts           # Barrel export
│   │
│   ├── contexts/               # State management
│   │   ├── CampusContext.tsx  # Campus state & hooks
│   │   └── ShopContext.tsx    # Shop state & hooks
│   │
│   ├── middleware/             # Custom middleware
│   ├── utils/                  # Utility functions
│   │   └── helpers.ts         # Common helpers
│   └── styles/                 # Custom styles (if needed)
│
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── .env.local                  # Local environment variables
├── .env.example               # Example env file
└── README.md
```

## 📦 Key Dependencies

- **Next.js 16.1.6** - React framework
- **React 19** - UI library
- **Material-UI 6.0** - Component library
- **Emotion** - CSS-in-JS
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Lucide React** - Icons

## 🎨 Features

### Dashboard Page
- Real-time statistics
- Campus and shop counts
- Execution mode distribution
- Quick start guide

### Campuses Management
- ✅ View all campuses
- ✅ Add new campus
- ✅ Edit campus details
- ✅ Delete campus
- Responsive card layout
- Loading & error states

### Shops Management
- ✅ View all shops
- ✅ Add new shop to campus
- ✅ Edit shop configuration
- ✅ Delete shop
- Filter by execution mode
- Display campus association
- Show execution & payment modes

### Shared UI Components
1. **PrimaryButton** - Animated button with loading states
2. **ReusableModal** - Reusable dialog/modal component
3. **InfoCard** - Display information with actions
4. **AdminLayout** - Sidebar + header navigation

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
cp .env.example .env.local
```

3. Update API URL in `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📋 Component Usage

### Using PrimaryButton
```tsx
import { PrimaryButton } from '@/shared/components';

<PrimaryButton
  variant="contained"
  onClick={handleClick}
  isLoading={loading}
>
  Click Me
</PrimaryButton>
```

### Using ReusableModal
```tsx
import { ReusableModal } from '@/shared/components';

<ReusableModal
  open={isOpen}
  title="Add Campus"
  onClose={handleClose}
  onSubmit={handleSubmit}
  submitButtonText="Create"
>
  {/* Form content */}
</ReusableModal>
```

### Using InfoCard
```tsx
import { InfoCard } from '@/shared/components';

<InfoCard
  title="Campus Name"
  subtitle="Location"
  icon={<BuildingIcon />}
  metadata={[
    { label: 'Created', value: '2024-01-01' }
  ]}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## 🔌 API Integration

### Using Campus Service
```tsx
import { campusService, Campus } from '@/services';

// Fetch all campuses
const campuses = await campusService.listAll();

// Create new campus
const newCampus = await campusService.create({
  name: 'Downtown Campus',
  location: '123 Main St'
});

// Update campus
const updated = await campusService.update(id, {
  name: 'Updated Name'
});

// Delete campus
await campusService.delete(id);
```

### Using Shop Service
```tsx
import { shopService, Shop } from '@/services';

// Fetch all shops
const shops = await shopService.listAll();

// Create shop
const newShop = await shopService.create({
  campus_id: campusId,
  name: 'Central Print Shop',
  execution_mode: 'manual',
  payment_mode: 'counter',
  is_active: true
});

// Get label for execution mode
const label = shopService.getExecutionModeLabel('assisted');
// Returns: '⚙️ Assisted'
```

## 🎯 State Management

### Using Campus Context
```tsx
import { useCampus } from '@/contexts/CampusContext';

const MyComponent = () => {
  const {
    campuses,
    loading,
    error,
    fetchCampuses,
    addCampus,
    editCampus,
    removeCampus
  } = useCampus();

  // Use the state and functions
};
```

### Using Shop Context
```tsx
import { useShop } from '@/contexts/ShopContext';

const MyComponent = () => {
  const {
    shops,
    loading,
    error,
    fetchShops,
    addShop,
    editShop,
    removeShop,
    getShopsByCampus
  } = useShop();

  // Use the state and functions
};
```

## 🎨 Customization

### Theming
Modify the theme in `app/layout.tsx`:
```tsx
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f5576c' },
    // ... more customizations
  },
});
```

### Colors & Styling
- Primary: `#1976d2` (Blue)
- Secondary: `#f5576c` (Red)
- Success: `#4caf50` (Green)
- Background: `#f5f7fa` (Light Gray)

## 🔐 Authentication (Future)

Authentication will be integrated via Supabase. Update the services to include JWT tokens when available:

```tsx
const api = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 📝 Best Practices

1. **Component Organization**
   - Keep page-specific components in their page folder
   - Move shared components to `src/shared/components`

2. **API Calls**
   - Always use services from `src/services`
   - Handle loading and error states
   - Use context hooks for state management

3. **Styling**
   - Use Material-UI sx prop for styling
   - Maintain consistent spacing and colors
   - Use Framer Motion for animations

4. **Type Safety**
   - Define interfaces in service files
   - Use proper TypeScript types throughout
   - Avoid `any` types

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in backend
- Verify `.env.local` has correct API URL

### Component Import Errors
- Check path aliases in `tsconfig.json`
- Verify component exports in `index.ts` files
- Use relative imports if path aliases fail

### Material-UI Theme Issues
- Ensure `ThemeProvider` wraps components
- Check `CssBaseline` is included
- Verify theme customizations

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios Documentation](https://axios-http.com/)

## 🚢 Deployment

Deploy to Vercel:
```bash
vercel deploy
```

Or use your preferred hosting platform:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS Amplify

## 📄 License

MIT License - See LICENSE file for details
