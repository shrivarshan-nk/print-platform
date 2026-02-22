"use client";

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ReusableModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
  children: React.ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  isLoading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const MotionDialog = motion(Dialog);

export const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  children,
  submitButtonText = 'Submit',
  cancelButtonText = 'Cancel',
  isLoading = false,
  maxWidth = 'sm',
}) => {
  const handleSubmit = async () => {
    await onSubmit();
    onClose();
  };

  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        },
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <DialogTitle sx={{ padding: 0, fontSize: '1.5rem', fontWeight: 700 }}>
          {title}
        </DialogTitle>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#666',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: '30px 20px', minHeight: '200px' }}>
        {children}
      </DialogContent>

      <DialogActions
        sx={{
          padding: '20px',
          borderTop: '1px solid #e0e0e0',
          gap: '10px',
        }}
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
        >
          {cancelButtonText}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: isLoading ? '#ccc' : '#1976d2',
            color: '#fff',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.backgroundColor = '#1565c0';
          }}
          onMouseLeave={(e) => {
            if (!isLoading) e.currentTarget.style.backgroundColor = '#1976d2';
          }}
        >
          {isLoading ? 'Loading...' : submitButtonText}
        </button>
      </DialogActions>
    </MotionDialog>
  );
};

export default ReusableModal;
