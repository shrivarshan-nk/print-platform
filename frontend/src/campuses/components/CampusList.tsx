'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { MapPin, Trash2, Edit2 } from 'lucide-react';
import { InfoCard } from '@/shared/components';
import { Campus } from '@/api';

interface CampusListProps {
  campuses: Campus[];
  loading: boolean;
  error: string | null;
  onEdit: (campus: Campus) => void;
  onDelete: (id: string) => void;
  onCampusSelect?: (campus: Campus) => void;
}

export const CampusList: React.FC<CampusListProps> = ({
  campuses,
  loading,
  error,
  onEdit,
  onDelete,
  onCampusSelect,
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

  if (campuses.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
        }}
      >
        <Box sx={{ fontSize: '48px', mb: 2 }}>🏫</Box>
        <Typography variant="h6" sx={{ color: '#666', fontWeight: 600 }}>
          No campuses yet
        </Typography>
        <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
          Create your first campus to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {campuses.map((campus) => (
        <Grid item xs={12} sm={6} md={4} key={campus.id}>
          <InfoCard
            title={campus.name}
            subtitle="Campus"
            description={campus.location}
            icon={<MapPin size={20} />}
            metadata={[
              {
                label: 'Created',
                value: new Date(campus.created_at).toLocaleDateString(),
              },
            ]}
            onEdit={() => onEdit(campus)}
            onDelete={() => {
              if (confirm(`Delete campus "${campus.name}"?`)) {
                onDelete(campus.id);
              }
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CampusList;
