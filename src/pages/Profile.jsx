import { useState } from 'react';
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
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, signOut, updateUserInfo, bookingHistory } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleOpenEdit = () => {
    setEditForm({
      firstName: userInfo.firstName || '',
      lastName: userInfo.lastName || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      address: userInfo.address || '',
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

  const handleSaveChanges = () => {
    updateUserInfo(editForm);
    handleCloseEdit();
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  if (!userInfo) {
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
                src={userInfo.avatar}
              >
                {userInfo.firstName?.[0] || userInfo.email[0].toUpperCase()}
              </Avatar>
              <Box flex={1}>
                <Typography variant="h4" gutterBottom>
                  {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {userInfo.email}
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

        {/* Booking History */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
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
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 