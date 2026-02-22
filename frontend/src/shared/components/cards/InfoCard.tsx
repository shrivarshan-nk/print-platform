"use client";

import React from 'react';
import { Card, CardContent, CardActions, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description?: string;
  subtitle?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  actionButtons?: React.ReactNode;
  metadata?: { label: string; value: string | React.ReactNode }[];
}

const MotionCard = motion(Card);

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  subtitle,
  onEdit,
  onDelete,
  children,
  icon,
  actionButtons,
  metadata = [],
}) => {
  return (
    <MotionCard
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, padding: '24px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '12px', mb: 2 }}>
          {icon && (
            <Box sx={{ color: '#1976d2', display: 'flex', mt: 0.5 }}>
              {icon}
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#1a1a1a',
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                sx={{
                  color: '#666',
                  fontSize: '0.85rem',
                  display: 'block',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: '#555',
              fontSize: '0.95rem',
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        )}

        {metadata.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              mt: 2,
              pt: 2,
              borderTop: '1px solid #f0f0f0',
            }}
          >
            {metadata.map((item, idx) => (
              <Box key={idx}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#999',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1a1a1a',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {children}
      </CardContent>

      {(onEdit || onDelete || actionButtons) && (
        <CardActions
          sx={{
            padding: '12px 24px',
            borderTop: '1px solid #f0f0f0',
            gap: '8px',
            justifyContent: 'flex-end',
          }}
        >
          {actionButtons || (
            <>
              {onEdit && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEdit}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #1976d2',
                    backgroundColor: '#fff',
                    color: '#1976d2',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#e3f2fd')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fff')
                  }
                >
                  Edit
                </motion.button>
              )}
              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDelete}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #f44336',
                    backgroundColor: '#fff',
                    color: '#f44336',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#ffebee')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fff')
                  }
                >
                  Delete
                </motion.button>
              )}
            </>
          )}
        </CardActions>
      )}
    </MotionCard>
  );
};

export default InfoCard;
