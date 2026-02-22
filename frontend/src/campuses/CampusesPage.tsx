'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Plus } from 'lucide-react';
import { ReusableModal, PrimaryButton } from '@/shared/components';
import { useCampus } from '@/contexts/CampusContext';
import { CampusCreate, CampusUpdate, Campus } from '@/api';
import { motion } from 'framer-motion';

// Local imports from this folder's structure
import CampusForm from './components/CampusForm';
import CampusList from './components/CampusList';
import {
  fetchAllCampuses,
  createNewCampus,
  updateExistingCampus,
  deleteExistingCampus,
} from './middleware';

export const CampusesPage: React.FC = () => {
  // Global context for state management
  const { campuses, loading, error, fetchCampuses, addCampus, editCampus, removeCampus } =
    useCampus();

  // Local component state
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch campuses on mount
  useEffect(() => {
    fetchCampuses();
  }, [fetchCampuses]);

  // Auto-clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleOpenModal = () => {
    setIsEditing(false);
    setSelectedCampus(null);
    setOpenModal(true);
  };

  const handleEditCampus = (campus: Campus) => {
    setSelectedCampus(campus);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleSubmit = async (data: CampusCreate | CampusUpdate) => {
    setSubmitLoading(true);
    try {
      if (isEditing && selectedCampus) {
        // Use middleware for update
        const result = await updateExistingCampus(selectedCampus.id, data as CampusUpdate);
        if (result.success) {
          // Update context
          await editCampus(selectedCampus.id, data as CampusUpdate);
          setSuccessMessage(result.message || 'Campus updated successfully!');
        } else {
          setSuccessMessage(result.error || 'Failed to update campus');
        }
      } else {
        // Use middleware for create
        const result = await createNewCampus(data as CampusCreate);
        if (result.success) {
          // Update context
          await addCampus(data as CampusCreate);
          setSuccessMessage(result.message || 'Campus added successfully!');
        } else {
          setSuccessMessage(result.error || 'Failed to add campus');
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

  const handleDeleteCampus = async (id: string) => {
    try {
      // Use middleware for delete
      const result = await deleteExistingCampus(id);
      if (result.success) {
        // Update context
        await removeCampus(id);
        setSuccessMessage(result.message || 'Campus deleted successfully!');
      } else {
        setSuccessMessage(result.error || 'Failed to delete campus');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      setSuccessMessage('An error occurred. Please try again.');
    }
  };

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
              mb: 6,
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
                🏫 Campuses
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', fontSize: '1.05rem' }}>
                Manage all your campuses and their settings
              </Typography>
            </Box>
            <PrimaryButton
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={handleOpenModal}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              }}
            >
              Add Campus
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

        {/* Campus List */}
        <CampusList
          campuses={campuses}
          loading={loading}
          error={error}
          onEdit={handleEditCampus}
          onDelete={handleDeleteCampus}
        />
      </Box>

      {/* Modal */}
      <ReusableModal
        open={openModal}
        title={isEditing ? '✏️ Edit Campus' : '➕ Add Campus'}
        onClose={() => {
          setOpenModal(false);
          setSelectedCampus(null);
        }}
        onSubmit={() => {}}
        submitButtonText={isEditing ? 'Update' : 'Create'}
        isLoading={submitLoading}
        maxWidth="sm"
      >
        <CampusForm
          onSubmit={handleSubmit}
          initialData={
            isEditing && selectedCampus
              ? { name: selectedCampus.name, location: selectedCampus.location }
              : undefined
          }
          isLoading={submitLoading}
        />
      </ReusableModal>
    </Container>
  );
};

export default CampusesPage;
