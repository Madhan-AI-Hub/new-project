import React from 'react';
import { Box, Skeleton, Stack, Paper } from '@mui/material';

interface LoadingStateProps {
  variant?: 'table' | 'card';
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ variant = 'table', count = 5 }) => {
  if (variant === 'card') {
    return (
      <Stack spacing={2}>
        {Array.from({ length: count }).map((_, index) => (
          <Paper key={index} sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    );
  }

  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Stack key={index} direction="row" spacing={2} sx={{ py: 2, px: 1 }}>
          <Skeleton variant="text" width="20%" height={24} />
          <Skeleton variant="text" width="25%" height={24} />
          <Skeleton variant="text" width="15%" height={24} />
          <Skeleton variant="text" width="20%" height={24} />
          <Skeleton variant="text" width="15%" height={24} />
          <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
        </Stack>
      ))}
    </Box>
  );
};
