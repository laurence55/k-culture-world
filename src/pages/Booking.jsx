import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuth } from '../context/AuthContext';
import SignInPrompt from '../components/SignInPrompt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const experiences = [
  {
    id: 1,
    name: 'D R E S S L I K E A K - S T A R Z O NE',
    price: 100,
    duration: '2 hours',
    maxGuests: 5,
    description: 'Experience the glamour of K-pop fashion with professional styling and photo opportunities.',
    image: 'https://images.unsplash.com/photo-1512206879471-eea3be4ec8c8?w=800&auto=format&fit=crop&q=80',
    features: [
      'Professional K-pop styling',
      'Photo shoot session',
      'Costume rental',
      'Makeup application',
      'Digital photos included'
    ]
  },
  {
    id: 2,
    name: 'K-FOOD ZONE',
    price: 75,
    duration: '1.5 hours',
    maxGuests: 8,
    description: 'Taste authentic Korean cuisine with a variety of traditional dishes and street food.',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&auto=format&fit=crop&q=80',
    features: [
      'Traditional Korean dishes',
      'Street food tasting',
      'Cooking demonstration',
      'Recipe sharing',
      'Beverage pairing'
    ]
  },
  {
    id: 3,
    name: 'K-SOUVENIR ZONE',
    price: 50,
    duration: '1 hour',
    maxGuests: 10,
    description: 'Browse and purchase authentic Korean souvenirs and cultural items.',
    image: 'https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?w=800&auto=format&fit=crop&q=80',
    features: [
      'Traditional crafts',
      'K-pop merchandise',
      'Korean beauty products',
      'Cultural artifacts',
      'Gift wrapping service'
    ]
  },
  {
    id: 4,
    name: 'K-KARAOKE ZONE',
    price: 80,
    duration: '2 hours',
    maxGuests: 6,
    description: 'Sing your favorite K-pop songs in our premium karaoke rooms.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80',
    features: [
      'Private karaoke room',
      'Latest K-pop songs',
      'High-quality sound system',
      'LED display',
      'Snacks and drinks included'
    ]
  },
  {
    id: 5,
    name: 'K-Cinema Zone',
    price: 90,
    duration: '2.5 hours',
    maxGuests: 4,
    description: 'Watch popular Korean movies and dramas in our private cinema.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    features: [
      'Private screening room',
      'Latest Korean movies',
      'Premium seating',
      'Snacks and drinks',
      'English subtitles'
    ]
  },
];

const Booking = () => {
  const navigate = useNavigate();
  const { isAuthenticated, addBooking } = useAuth();
  const [selectedExperience, setSelectedExperience] = useState('');
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExperienceDetails, setSelectedExperienceDetails] = useState(null);

  const handleExperienceSelect = (experience) => {
    setSelectedExperience(experience.id);
    setSelectedExperienceDetails(experience);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setError('');
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
    setError('');
  };

  const validateForm = () => {
    if (!selectedExperience) {
      setError('Please select an experience');
      return false;
    }
    if (!date) {
      setError('Please select a date');
      return false;
    }
    if (!guests) {
      setError('Please enter the number of guests');
      return false;
    }
    const numGuests = parseInt(guests);
    const experience = experiences.find(exp => exp.id === selectedExperience);
    if (numGuests < 1) {
      setError('Number of guests must be at least 1');
      return false;
    }
    if (numGuests > experience.maxGuests) {
      setError(`Maximum ${experience.maxGuests} guests allowed for this experience`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const experience = experiences.find(exp => exp.id === selectedExperience);
      const bookingData = {
        experience: experience,
        date: date.toISOString(),
        guests: parseInt(guests),
        totalPrice: experience.price * parseInt(guests),
      };

      addBooking(bookingData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError('Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <SignInPrompt />;
  }

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
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          variant="h1"
          gutterBottom
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            color: 'white',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '-0.02em',
          }}
        >
          Book Your Experience
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '1rem',
              },
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '1rem',
              },
            }}
          >
            Booking successful! Redirecting to your profile...
          </Alert>
        )}

        <Grid container spacing={4}>
          {experiences.map((experience) => (
            <Grid item xs={12} sm={6} md={4} key={experience.id}>
              <Card
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
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={experience.image}
                  alt={experience.name}
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {experience.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {experience.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={experience.duration}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderRadius: 1,
                        '& .MuiChip-label': {
                          fontSize: '0.85rem',
                        },
                      }}
                    />
                    <Chip
                      icon={<GroupIcon />}
                      label={`Max ${experience.maxGuests} guests`}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderRadius: 1,
                        '& .MuiChip-label': {
                          fontSize: '0.85rem',
                        },
                      }}
                    />
                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={`$${experience.price} per person`}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderRadius: 1,
                        '& .MuiChip-label': {
                          fontSize: '0.85rem',
                        },
                      }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ p: { xs: 2, md: 3 }, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleExperienceSelect(experience)}
                    sx={{
                      py: 1.5,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 600,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Select Experience
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              p: { xs: 2, md: 3 },
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2rem' },
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              Book {selectedExperienceDetails?.name}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    Experience Details
                  </Typography>
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.8,
                    }}
                  >
                    {selectedExperienceDetails?.description}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      fontWeight: 600,
                      color: 'primary.main',
                      mt: 2,
                    }}
                  >
                    Features:
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedExperienceDetails?.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            lineHeight: 1.6,
                          }}
                        >
                          • {feature}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Select Date"
                      value={date}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-root': {
                          backgroundColor: 'white',
                          borderRadius: 1,
                        },
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Number of Guests"
                    type="number"
                    value={guests}
                    onChange={handleGuestsChange}
                    inputProps={{
                      min: 1,
                      max: selectedExperienceDetails?.maxGuests,
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: 'white',
                        borderRadius: 1,
                      },
                    }}
                  />
                </Grid>

                {guests && (
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        p: { xs: 2, md: 3 },
                        borderRadius: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Typography 
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          fontWeight: 600,
                          color: 'primary.main',
                        }}
                      >
                        Total Price: ${selectedExperienceDetails?.price * parseInt(guests)}
                      </Typography>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, md: 3 }, pt: { xs: 1, md: 2 } }}>
            <Button 
              onClick={handleCloseDialog}
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:disabled': {
                  bgcolor: 'rgba(0,0,0,0.12)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Confirm Booking'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Booking; 