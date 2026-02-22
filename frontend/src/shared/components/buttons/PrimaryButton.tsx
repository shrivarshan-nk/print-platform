"use client";

import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface PrimaryButtonProps extends ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

const MotionButton = motion(Button);

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading = false,
  disabled = false,
  children,
  ...props
}) => {
  return (
    <MotionButton
      {...props}
      disabled={disabled || isLoading}
      variant={props.variant || 'contained'}
      whileHover={{ scale: !disabled && !isLoading ? 1.02 : 1 }}
      whileTap={{ scale: !disabled && !isLoading ? 0.98 : 1 }}
      sx={{
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '8px',
        padding: '10px 20px',
        transition: 'all 0.3s ease',
        ...props.sx,
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ mr: 1 }} />
      ) : null}
      {children}
    </MotionButton>
  );
};

export default PrimaryButton;
