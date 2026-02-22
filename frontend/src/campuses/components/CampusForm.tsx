'use client';

import React, { useState } from 'react';
import { TextField, Box, Button, CircularProgress } from '@mui/material';
import { CampusCreate, CampusUpdate } from '@/api';

interface CampusFormProps {
  onSubmit: (data: CampusCreate | CampusUpdate) => Promise<void>;
  initialData?: CampusCreate | CampusUpdate;
  isLoading?: boolean;
}

export const CampusForm: React.FC<CampusFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: (initialData as any)?.name || '',
    location: (initialData as any)?.location || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Campus name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <TextField
        label="Campus Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        disabled={isLoading}
        placeholder="e.g., Downtown Campus"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
      <TextField
        label="Location"
        value={formData.location}
        onChange={(e) => handleChange('location', e.target.value)}
        error={!!errors.location}
        helperText={errors.location}
        fullWidth
        disabled={isLoading}
        placeholder="e.g., 123 Main Street, New York"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '8px',
          marginTop: '16px',
          textTransform: 'none',
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: '#fff' }} />
            Saving...
          </>
        ) : (
          'Save Campus'
        )}
      </Button>
    </Box>
  );
};

export default CampusForm;
