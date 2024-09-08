import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Container>
  );
};

export default Loading;
