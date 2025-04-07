import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as EmojiEventsIcon,
  Groups as GroupsIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  Diversity3 as TeamIcon,
  Celebration as CelebrationIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const About = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Authentic Experience',
      description: 'Immerse yourself in genuine Korean culture with our carefully curated experiences.',
      details: {
        highlights: [
          'Traditional Korean customs and practices',
          'Authentic K-pop dance and music sessions',
          'Traditional Korean tea ceremonies',
          'Korean traditional games and activities',
          'Cultural workshops with native speakers'
        ],
        testimonials: [
          {
            name: 'Sarah K.',
            text: 'The traditional tea ceremony was exactly like what I experienced in Korea!'
          },
          {
            name: 'Mike J.',
            text: 'Learning K-pop dance from actual Korean instructors made it so authentic.'
          }
        ]
      }
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Expert Guides',
      description: 'Learn from passionate Korean culture experts who bring authenticity to every interaction.',
      details: {
        highlights: [
          'Native Korean instructors',
          'Certified K-pop dance teachers',
          'Cultural experts with years of experience',
          'Language specialists',
          'Professional photographers for K-pop photo shoots'
        ],
        testimonials: [
          {
            name: 'Lisa M.',
            text: 'Our guide was so knowledgeable about Korean culture and history.'
          },
          {
            name: 'David W.',
            text: 'The dance instructor was amazing at breaking down complex moves.'
          }
        ]
      }
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Premium Quality',
      description: 'Experience the finest Korean cultural activities in a comfortable and welcoming environment.',
      details: {
        highlights: [
          'High-end equipment and facilities',
          'Premium K-pop costumes and props',
          'Professional sound systems',
          'Quality materials for traditional crafts',
          'Comfortable and spacious venues'
        ],
        testimonials: [
          {
            name: 'Emma R.',
            text: 'The quality of the costumes and props was outstanding!'
          },
          {
            name: 'John D.',
            text: 'Everything was top-notch, from the facilities to the equipment.'
          }
        ]
      }
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40 }} />,
      title: 'Convenient Location',
      description: 'Located in the heart of the city, easily accessible for all visitors.',
      details: {
        highlights: [
          'Central location with easy access',
          'Multiple transportation options nearby',
          'Parking facilities available',
          'Close to major attractions',
          'Accessible for people with disabilities'
        ],
        testimonials: [
          {
            name: 'Amy L.',
            text: 'The location was perfect, just a short walk from the subway station.'
          },
          {
            name: 'Tom B.',
            text: 'Easy to find and plenty of parking available.'
          }
        ]
      }
    },
  ];

  const achievements = [
    {
      icon: <TeamIcon />,
      title: 'Diverse Community',
      description: 'Join thousands of K-culture enthusiasts from around the world',
    },
    {
      icon: <CelebrationIcon />,
      title: 'Authentic Experiences',
      description: 'Carefully curated Korean cultural experiences and activities',
    },
  ];

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  const handleCloseDialog = () => {
    setSelectedFeature(null);
  };

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
          minHeight: { xs: '50vh', md: '60vh' },
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
            About Us
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
            Discover the story behind K-Culture World and our mission to share Korean culture
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={4}>
          {/* Mission Section */}
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom 
                align="center"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 3,
                  color: 'primary.main',
                }}
              >
                Our Mission
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                align="center" 
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                At K-Culture World, we are passionate about bringing authentic Korean cultural experiences to enthusiasts worldwide. Our mission is to create immersive and memorable experiences that showcase the richness of Korean heritage, from traditional customs to modern K-pop culture.
              </Typography>
            </Card>
          </Grid>

          {/* Achievements Section */}
          <Grid item xs={12}>
            <Typography 
              variant="h3" 
              gutterBottom 
              align="center" 
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                color: 'white',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Our Achievements
            </Typography>
            <Grid container spacing={4}>
              {achievements.map((achievement, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease-in-out',
                      borderRadius: 2,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4, px: { xs: 2, md: 3 } }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: 'primary.main',
                          mb: 3,
                          mx: 'auto',
                          transform: 'scale(1)',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        {achievement.icon}
                      </Avatar>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                        }}
                      >
                        {achievement.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          fontSize: { xs: '0.9rem', md: '1rem' },
                        }}
                      >
                        {achievement.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Values Section */}
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                p: 4,
              }}
            >
              <Typography variant="h3" gutterBottom align="center">
                Our Values
              </Typography>
              <Typography variant="body1" paragraph align="center">
                We believe in authenticity, cultural respect, and creating meaningful connections. Every experience we offer is carefully designed to provide genuine insights into Korean culture while fostering understanding and appreciation among our global community.
              </Typography>
            </Card>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12}>
            <Typography 
              variant="h3" 
              gutterBottom 
              align="center" 
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                color: 'white',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Our Features
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    onClick={() => handleFeatureClick(feature)}
                    sx={{
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease-in-out',
                      borderRadius: 2,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Box sx={{ mb: 2, color: 'primary.main' }}>
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Experience Zones */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            color: 'white', 
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Our Experience Zones
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1512206879471-eea3be4ec8c8?w=800&auto=format&fit=crop&q=80"
                alt="D R E S S L I K E A K - S T A R Z O NE"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  D R E S S L I K E A K - S T A R Z O NE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transform into your favorite K-pop idol with our extensive collection of stage outfits and accessories.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&auto=format&fit=crop&q=80"
                alt="K-FOOD ZONE"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  K-FOOD ZONE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Indulge in authentic Korean cuisine with our cooking classes and food tasting experiences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?w=800&auto=format&fit=crop&q=80"
                alt="K-SOUVENIR ZONE"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  K-SOUVENIR ZONE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse through our curated collection of Korean souvenirs and traditional crafts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80"
                alt="K-KARAOKE ZONE"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  K-KARAOKE ZONE
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sing your heart out to your favorite K-pop hits in our private karaoke rooms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80"
                alt="K-Cinema Zone"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  K-Cinema Zone
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Watch the latest Korean dramas and movies in our comfortable cinema room.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Information */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        <Card
          sx={{
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2rem' },
              color: 'primary.main',
              mb: 3,
            }}
          >
            Visit Us
          </Typography>
          <Typography 
            variant="body1" 
            paragraph
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
            }}
          >
            We're located in the heart of the city, making it easy for you to experience the best of Korean culture.
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
            }}
          >
            Address: 123 Korean Culture Street, City, Country
            <br />
            Phone: +1 234 567 8900
            <br />
            Email: info@koreancultureworld.com
          </Typography>
        </Card>
      </Container>

      {/* Feature Details Dialog */}
      <Dialog
        open={Boolean(selectedFeature)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          },
        }}
      >
        {selectedFeature && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ color: 'primary.main' }}>
                  {selectedFeature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {selectedFeature.title}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}
              >
                {selectedFeature.description}
              </Typography>

              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                Key Highlights
              </Typography>
              <List>
                {selectedFeature.details.highlights.map((highlight, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={highlight} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 4 }} />

              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                What Our Visitors Say
              </Typography>
              <Grid container spacing={3}>
                {selectedFeature.details.testimonials.map((testimonial, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography 
                          variant="body1" 
                          paragraph
                          sx={{ fontStyle: 'italic', mb: 2 }}
                        >
                          "{testimonial.text}"
                        </Typography>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ fontWeight: 600, color: 'primary.main' }}
                        >
                          - {testimonial.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                startIcon={<CloseIcon />}
                sx={{ color: 'text.secondary' }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default About; 