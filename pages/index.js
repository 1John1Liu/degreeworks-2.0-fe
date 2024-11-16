import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const Home = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await fetch('http://localhost:4000/login'); // Your backend endpoint
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };

    fetchHTML();
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: 500,
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <h1>Login Form</h1>
      {/* Render fetched HTML */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 2,
        }}
        
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Box>
  );
};

export default Home;
