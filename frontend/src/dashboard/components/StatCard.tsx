'use client';

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subtitle, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          borderRadius: '12px',
          border: `2px solid ${color}20`,
          backgroundColor: `${color}08`,
          height: '100%',
        }}
      >
        <CardContent sx={{ padding: '24px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', mb: 1 }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: '#1a1a1a', mb: subtitle ? 1 : 0 }}
              >
                {value}
              </Typography>
              {subtitle && (
                <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                backgroundColor: `${color}15`,
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
