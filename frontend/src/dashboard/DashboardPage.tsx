'use client';

import React, { useEffect, useMemo } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { Building2, Store, BarChart3 } from 'lucide-react';
import { useCampus } from '@/contexts/CampusContext';
import { useShop } from '@/contexts/ShopContext';

// Local imports from this folder's structure
import StatCard from './components/StatCard';
import { getDashboardStats } from './middleware';
import { getExecutionModeStats, formatDashboardStats } from './services';

export const DashboardPage: React.FC = () => {
  const { campuses, fetchCampuses } = useCampus();
  const { shops, fetchShops } = useShop();

  useEffect(() => {
    fetchCampuses();
    fetchShops();
  }, [fetchCampuses, fetchShops]);

  // Calculate statistics using middleware
  const stats = useMemo(() => {
    const totalCampuses = campuses.length;
    const totalShops = shops.length;
    const activeShops = shops.filter((s) => s.is_active).length;
    const manualShops = shops.filter((s) => s.execution_mode === 'manual').length;
    const assistedShops = shops.filter((s) => s.execution_mode === 'assisted').length;
    const autoShops = shops.filter((s) => s.execution_mode === 'auto').length;

    return {
      totalCampuses,
      totalShops,
      activeShops,
      manualShops,
      assistedShops,
      autoShops,
    };
  }, [campuses, shops]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: '#1a1a1a',
                mb: 1,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              👋 Welcome to Admin Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.05rem' }}>
              Manage your campuses, print shops, and configurations
            </Typography>
          </Box>
        </motion.div>

        {/* Statistics Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Building2 size={24} />}
              title="Total Campuses"
              value={stats.totalCampuses}
              subtitle="Active campuses"
              color="#667eea"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Store size={24} />}
              title="Total Shops"
              value={stats.totalShops}
              subtitle={`${stats.activeShops} active`}
              color="#f5576c"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<BarChart3 size={24} />}
              title="Shop Configuration"
              value={`${stats.manualShops} / ${stats.assistedShops} / ${stats.autoShops}`}
              subtitle="Manual / Assisted / Auto"
              color="#4facfe"
            />
          </Grid>
        </Grid>

        {/* Execution Mode Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#fff',
              mb: 4,
            }}
          >
            <CardContent sx={{ padding: '24px' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}>
                📊 Execution Mode Distribution
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      ✍️ Manual
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                      {stats.manualShops}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Staff prints manually from browser
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      ⚙️ Assisted
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#f5576c' }}>
                      {stats.assistedShops}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Desktop agent automates printing
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      🚀 Automated
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#4facfe' }}>
                      {stats.autoShops}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      Fully automatic printing
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
            }}
          >
            <CardContent sx={{ padding: '24px' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}>
                🚀 Quick Start
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                <strong>1. Set up Campuses</strong>: Create your campus locations and assign them
                locations.
                <br />
                <strong>2. Add Print Shops</strong>: Add print shops to your campuses and choose
                their execution mode.
                <br />
                <strong>3. Configure Pricing</strong>: Set up pricing for different paper sizes and
                color modes.
                <br />
                <strong>4. Manage Users</strong>: Invite campus admins and users to your platform.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Container>
  );
};

export default DashboardPage;
