import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import SignInPrompt from '../components/SignInPrompt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const handleBookNow = () => {
    navigate('/booking');
  };

  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'K-FOOD ZONE',
      description: 'Experience authentic Korean cuisine and cooking classes',
    },
    {
      icon: <TheaterComedyIcon sx={{ fontSize: 40 }} />,
      title: 'D R E S S L I K E A K - S T A R Z O N E',
      description: 'Transform into your favorite K-pop star with professional styling',
    },
    {
      icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
      title: 'K-SOUVENIR ZONE',
      description: 'Find unique Korean cultural items and memorabilia',
    },
    {
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      title: 'K-KARAOKE ZONE',
      description: 'Sing your heart out with the latest K-pop hits',
    },
    {
      icon: <LocalMoviesIcon sx={{ fontSize: 40 }} />,
      title: 'K-Cinema Zone',
      description: 'Watch the best Korean movies and dramas',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(rgba(106, 27, 154, 0.8), rgba(156, 39, 176, 0.8)), url('https://images.unsplash.com/photo-1517736996303-4eec4a66bb17?q=80&w=1974&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: '80vh', md: '100vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: 2,
          mb: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            px: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              mb: 4,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Welcome to K-Culture World
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
              lineHeight: 1.5,
            }}
          >
            Immerse yourself in the vibrant world of Korean culture through unique experiences
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          ) : isAuthenticated ? (
            <Button
              variant="contained"
              size="large"
              onClick={handleBookNow}
              sx={{
                py: 2,
                px: 6,
                fontSize: { xs: '1rem', md: '1.2rem' },
                backgroundColor: 'white',
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              Book Now
            </Button>
          ) : (
            <SignInPrompt />
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mb: { xs: 6, md: 8 },
            color: 'white',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Our Experiences
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={handleBookNow}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <Box 
                    sx={{ 
                      mb: 3,
                      color: 'primary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80,
                    }}
                  >
                    {React.cloneElement(feature.icon, { 
                      sx: { 
                        fontSize: 56,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      } 
                    })}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 