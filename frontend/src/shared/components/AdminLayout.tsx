'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu, X, Home, Building2, Store } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = 280;

const navigationItems = [
  { label: 'Dashboard', icon: Home, href: '/admin', id: 'dashboard' },
  { label: 'Campuses', icon: Building2, href: '/admin/campuses', id: 'campuses' },
  { label: 'Shops', icon: Store, href: '/admin/shops', id: 'shops' },
];

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('md'));
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleNavigation = (href: string) => {
    router.push(href);
    setMobileDrawerOpen(false);
  };

  const SidebarContent = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      {/* Logo */}
      <Box sx={{ padding: '24px', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.2rem',
            }}
          >
            🖨️
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              PrintHub
            </Typography>
            <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
              Admin Panel
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, padding: '16px' }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <motion.div key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <ListItem
                onClick={() => handleNavigation(item.href)}
                sx={{
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: active ? '#e3f2fd' : 'transparent',
                  color: active ? '#1976d2' : '#666',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: active ? '#e3f2fd' : '#f5f5f5',
                  },
                  fontWeight: active ? 600 : 500,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: '40px',
                  }}
                >
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: 'inherit',
                  }}
                />
              </ListItem>
            </motion.div>
          );
        })}
      </List>

      {/* Footer */}
      <Box
        sx={{
          padding: '16px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 1 }}>
          © 2026 PrintHub
        </Typography>
        <Typography variant="caption" sx={{ color: '#bbb', display: 'block' }}>
          Admin Dashboard v1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Desktop Sidebar */}
      {mounted && !isMobile && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <SidebarContent />
        </Box>
      )}

      {/* Mobile Drawer */}
      {mounted && isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top AppBar */}
        <AppBar
          position="sticky"
          elevation={1}
          sx={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '60px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {mounted && isMobile && (
                <IconButton
                  onClick={() => setMobileDrawerOpen(true)}
                  sx={{ color: '#1a1a1a' }}
                >
                  <Menu size={24} />
                </IconButton>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  fontSize: '1.2rem',
                }}
              >
                Campus Print Management
              </Typography>
            </Box>

            {/* Right side actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                }}
              >
                👤
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#f5f7fa',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
