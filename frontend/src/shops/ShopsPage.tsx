'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Plus } from 'lucide-react';
import { ReusableModal, PrimaryButton } from '@/shared/components';
import { useCampus } from '@/contexts/CampusContext';
import { useShop } from '@/contexts/ShopContext';
import { ShopCreate, ShopUpdate, Shop, Campus } from '@/api';
import { motion } from 'framer-motion';

// Local imports from this folder's structure
import ShopForm from './components/ShopForm';
import ShopsList from './components/ShopsList';
import {
  fetchAllShops,
  createNewShop,
  updateExistingShop,
  deleteExistingShop,
} from './middleware';

type FilterType = 'all' | 'manual' | 'assisted' | 'auto';

export const ShopsPage: React.FC = () => {
  // Global context for state management
  const { campuses, loading: campusLoading, fetchCampuses } = useCampus();
  const { shops, loading: shopsLoading, error, fetchShops, addShop, editShop, removeShop } =
    useShop();

  // Local component state
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filterMode, setFilterMode] = useState<FilterType>('all');

  // Fetch shops and campuses on mount
  useEffect(() => {
    fetchCampuses();
    fetchShops();
  }, [fetchCampuses, fetchShops]);

  // Auto-clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleOpenModal = () => {
    setIsEditing(false);
    setSelectedShop(null);
    setOpenModal(true);
  };

  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleSubmit = async (data: ShopCreate | ShopUpdate) => {
    setSubmitLoading(true);
    try {
      if (isEditing && selectedShop) {
        // Use middleware for update
        const result = await updateExistingShop(selectedShop.id, data as ShopUpdate);
        if (result.success) {
          // Update context
          await editShop(selectedShop.id, data as ShopUpdate);
          setSuccessMessage(result.message || 'Shop updated successfully!');
        } else {
          setSuccessMessage(result.error || 'Failed to update shop');
        }
      } else {
        // Use middleware for create
        const result = await createNewShop(data as ShopCreate);
        if (result.success) {
          // Update context
          await addShop(data as ShopCreate);
          setSuccessMessage(result.message || 'Shop added successfully!');
        } else {
          setSuccessMessage(result.error || 'Failed to add shop');
        }
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      setSuccessMessage('An error occurred. Please try again.');
    } finally {
      setSubmitLoading(false);
      setOpenModal(false);
    }
  };

  const handleDeleteShop = async (id: string) => {
    try {
      // Use middleware for delete
      const result = await deleteExistingShop(id);
      if (result.success) {
        // Update context
        await removeShop(id);
        setSuccessMessage(result.message || 'Shop deleted successfully!');
      } else {
        setSuccessMessage(result.error || 'Failed to delete shop');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      setSuccessMessage('An error occurred. Please try again.');
    }
  };

  // Create campus map for quick lookup
  const campusMap = new Map(campuses.map((c) => [c.id, c]));

  // Filter shops based on selected mode
  const filteredShops =
    filterMode === 'all'
      ? shops
      : shops.filter((shop) => shop.execution_mode === filterMode);

  const loading = campusLoading || shopsLoading;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#1a1a1a',
                  mb: 1,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                🏪 Shops
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '1.05rem' }}>
                Manage your shops and their configurations
              </Typography>
            </Box>
            <PrimaryButton
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={handleOpenModal}
              sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
              }}
            >
              Add Shop
            </PrimaryButton>
          </Box>
        </motion.div>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Box
              sx={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #c3e6cb',
              }}
            >
              {successMessage}
            </Box>
          </motion.div>
        )}

        {/* Filter Buttons */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 2, fontWeight: 600 }}>
            Filter by Execution Mode
          </Typography>
          <ToggleButtonGroup
            value={filterMode}
            exclusive
            onChange={(e, newMode) => {
              if (newMode) setFilterMode(newMode);
            }}
            sx={{
              '& .MuiToggleButton-root': {
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#ddd',
                marginRight: '10px',
                marginBottom: '10px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  borderColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                },
              },
            }}
          >
            <ToggleButton value="all">All Shops ({shops.length})</ToggleButton>
            <ToggleButton value="manual">
              ✍️ Manual ({shops.filter((s) => s.execution_mode === 'manual').length})
            </ToggleButton>
            <ToggleButton value="assisted">
              ⚙️ Assisted ({shops.filter((s) => s.execution_mode === 'assisted').length})
            </ToggleButton>
            <ToggleButton value="auto">
              🚀 Auto ({shops.filter((s) => s.execution_mode === 'auto').length})
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Shops List */}
        <ShopsList
          shops={filteredShops}
          campuses={campusMap}
          loading={loading}
          error={error}
          onEdit={handleEditShop}
          onDelete={handleDeleteShop}
        />
      </Box>

      {/* Modal */}
      <ReusableModal
        open={openModal}
        title={isEditing ? '✏️ Edit Shop' : '➕ Add Shop'}
        onClose={() => {
          setOpenModal(false);
          setSelectedShop(null);
        }}
        onSubmit={() => {}}
        submitButtonText={isEditing ? 'Update' : 'Create'}
        isLoading={submitLoading}
        maxWidth="sm"
      >
        <ShopForm
          onSubmit={handleSubmit}
          initialData={
            isEditing && selectedShop
              ? {
                  campus_id: selectedShop.campus_id,
                  name: selectedShop.name,
                  execution_mode: selectedShop.execution_mode,
                  payment_mode: selectedShop.payment_mode,
                  is_active: selectedShop.is_active,
                }
              : undefined
          }
          isLoading={submitLoading}
          campuses={campuses}
        />
      </ReusableModal>
    </Container>
  );
};

export default ShopsPage;
