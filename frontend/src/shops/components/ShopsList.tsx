'use client';

import React from 'react';
import { Grid, Box, Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { Store, Trash2, Edit2 } from 'lucide-react';
import { InfoCard } from '@/shared/components';
import { Shop, Campus, shopService } from '@/api';

interface ShopsListProps {
  shops: Shop[];
  campuses: Map<string, Campus>;
  loading: boolean;
  error: string | null;
  onEdit: (shop: Shop) => void;
  onDelete: (id: string) => void;
}

export const ShopsList: React.FC<ShopsListProps> = ({
  shops,
  campuses,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (shops.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
        }}
      >
        <Box sx={{ fontSize: '48px', mb: 2 }}>🏪</Box>
        <Typography variant="h6" sx={{ color: '#666', fontWeight: 600 }}>
          No shops yet
        </Typography>
        <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
          Create your first shop to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {shops.map((shop) => {
        const campus = campuses.get(shop.campus_id);
        return (
          <Grid item xs={12} sm={6} md={4} key={shop.id}>
            <InfoCard
              title={shop.name}
              subtitle={campus?.name || 'Unknown Campus'}
              icon={<Store size={20} />}
              metadata={[
                {
                  label: 'Execution',
                  value: shopService.getExecutionModeLabel(shop.execution_mode),
                },
                {
                  label: 'Payment',
                  value: shopService.getPaymentModeLabel(shop.payment_mode),
                },
                {
                  label: 'Status',
                  value: (
                    <Chip
                      label={shop.is_active ? 'Active' : 'Inactive'}
                      color={shop.is_active ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  ),
                },
              ]}
              onEdit={() => onEdit(shop)}
              onDelete={() => {
                if (confirm(`Delete shop "${shop.name}"?`)) {
                  onDelete(shop.id);
                }
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ShopsList;
