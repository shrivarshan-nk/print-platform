'use client';

import React, { useState } from 'react';
import { TextField, MenuItem, Box, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material';
import { ShopCreate, ShopUpdate, ExecutionMode, PaymentMode, Campus } from '@/api';

interface ShopFormProps {
  onSubmit: (data: ShopCreate | ShopUpdate) => Promise<void>;
  initialData?: ShopCreate | ShopUpdate;
  isLoading?: boolean;
  campuses: Campus[];
  selectedCampusId?: string;
}

const EXECUTION_MODES: { value: ExecutionMode; label: string; description: string }[] = [
  {
    value: 'manual',
    label: '✍️ Manual',
    description: 'Shop staff manually prints from browser',
  },
  {
    value: 'assisted',
    label: '⚙️ Assisted',
    description: 'Desktop agent automates print dialog',
  },
  {
    value: 'auto',
    label: '🚀 Automated',
    description: 'Fully automatic printing (requires payment)',
  },
];

const PAYMENT_MODES: { value: PaymentMode; label: string }[] = [
  { value: 'counter', label: 'Pay @ Counter' },
  { value: 'prepaid', label: 'Prepaid Wallet' },
  { value: 'both', label: 'Both Options' },
];

export const ShopForm: React.FC<ShopFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
  campuses,
  selectedCampusId,
}) => {
  const [formData, setFormData] = useState({
    campus_id: (initialData as any)?.campus_id || selectedCampusId || '',
    name: (initialData as any)?.name || '',
    execution_mode: ((initialData as any)?.execution_mode || 'manual') as ExecutionMode,
    payment_mode: ((initialData as any)?.payment_mode || 'counter') as PaymentMode,
    is_active: (initialData as any)?.is_active !== false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.campus_id.trim()) newErrors.campus_id = 'Campus is required';
    if (!formData.name.trim()) newErrors.name = 'Shop name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const submitData = {
        campus_id: formData.campus_id,
        name: formData.name,
        execution_mode: formData.execution_mode,
        payment_mode: formData.payment_mode,
        is_active: formData.is_active,
      };
      await onSubmit(submitData as any);
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
        select
        label="Campus"
        value={formData.campus_id}
        onChange={(e) => handleChange('campus_id', e.target.value)}
        error={!!errors.campus_id}
        helperText={errors.campus_id}
        fullWidth
        disabled={isLoading || !!selectedCampusId}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      >
        <MenuItem value="">Select a campus</MenuItem>
        {campuses.map((campus) => (
          <MenuItem key={campus.id} value={campus.id}>
            {campus.name} - {campus.location}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Shop Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        disabled={isLoading}
        placeholder="e.g., Central Print Shop"
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />

      <Box>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>
          Execution Mode
        </label>
        {EXECUTION_MODES.map((mode) => (
          <Box
            key={mode.value}
            onClick={() => handleChange('execution_mode', mode.value)}
            sx={{
              padding: '12px',
              marginBottom: '8px',
              border:
                formData.execution_mode === mode.value ? '2px solid #1976d2' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor:
                formData.execution_mode === mode.value ? '#e3f2fd' : 'transparent',
              transition: 'all 0.2s',
              '&:hover': { borderColor: '#1976d2' },
            }}
          >
            <div style={{ fontWeight: 600 }}>{mode.label}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{mode.description}</div>
          </Box>
        ))}
      </Box>

      <TextField
        select
        label="Payment Mode"
        value={formData.payment_mode}
        onChange={(e) => handleChange('payment_mode', e.target.value as PaymentMode)}
        fullWidth
        disabled={isLoading}
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      >
        {PAYMENT_MODES.map((mode) => (
          <MenuItem key={mode.value} value={mode.value}>
            {mode.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_active}
            onChange={(e) => handleChange('is_active', e.target.checked)}
            disabled={isLoading}
          />
        }
        label="Active"
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
          'Save Shop'
        )}
      </Button>
    </Box>
  );
};

export default ShopForm;
