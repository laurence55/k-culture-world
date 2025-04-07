import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { userService } from '../services/firestore';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated, loading } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser && currentUser.uid) {
        try {
          setLoadingProfile(true);
          const profile = await userService.getUserById(currentUser.uid);
          setUserProfile(profile);
          
          // Initialize edit form with profile data
          setEditForm({
            displayName: profile?.displayName || currentUser.displayName || '',
            email: profile?.email || currentUser.email || '',
            phone: profile?.phone || '',
            address: profile?.address || '',
          });
          
          // Mock booking history - in a real app, this would come from a database
          setBookingHistory([
            {
              id: 1,
              experience: { name: 'K-FOOD ZONE' },
              date: new Date(),
              guests: 2,
              totalPrice: 150,
              status: 'Confirmed',
            },
            {
              id: 2,
              experience: { name: 'K-KARAOKE ZONE' },
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              guests: 4,
              totalPrice: 320,
              status: 'Completed',
            },
          ]);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleOpenEdit = () => {
    setEditForm({
      displayName: userProfile?.displayName || currentUser?.displayName || '',
      email: userProfile?.email || currentUser?.email || '',
      phone: userProfile?.phone || '',
      address: userProfile?.address || '',
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (currentUser && currentUser.uid) {
        const updatedProfile = await userService.updateUser(currentUser.uid, editForm);
        setUserProfile(updatedProfile);
        handleCloseEdit();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading || loadingProfile) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please Sign In to View Your Profile
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/signin')}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar
                sx={{ width: 100, height: 100, mr: 3 }}
                src={userProfile?.photoURL || currentUser?.photoURL}
              >
                {(userProfile?.displayName || currentUser?.displayName || currentUser?.email || 'U')[0].toUpperCase()}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" gutterBottom>
                  {userProfile?.displayName || currentUser?.displayName || 'User'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {userProfile?.email || currentUser?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since: {userProfile?.createdAt ? format(userProfile.createdAt.toDate(), 'MMMM yyyy') : 'N/A'}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleOpenEdit}
                  sx={{ mr: 2 }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Account Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Account Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Display Name" 
                  secondary={userProfile?.displayName || currentUser?.displayName || 'Not set'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Email" 
                  secondary={userProfile?.email || currentUser?.email || 'Not set'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <PhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Phone" 
                  secondary={userProfile?.phone || 'Not set'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <LocationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Address" 
                  secondary={userProfile?.address || 'Not set'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <CalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Account Created" 
                  secondary={userProfile?.createdAt ? format(userProfile.createdAt.toDate(), 'PPP') : 'N/A'} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Booking History */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Booking History
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {bookingHistory.length === 0 ? (
              <Typography color="text.secondary">
                No bookings found. Start exploring our experiences!
              </Typography>
            ) : (
              <List>
                {bookingHistory.map((booking) => (
                  <ListItem
                    key={booking.id}
                    divider
                    sx={{
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {booking.experience.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={booking.experience.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Date: {format(new Date(booking.date), 'PPP')}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Guests: {booking.guests}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Total Price: ${booking.totalPrice}
                          </Typography>
                        </>
                      }
                    />
                    <Chip
                      label={booking.status}
                      color={booking.status === 'Confirmed' ? 'success' : 'default'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="displayName"
            label="Display Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.displayName}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editForm.email}
            onChange={handleEditChange}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.phone}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.address}
            onChange={handleEditChange}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 