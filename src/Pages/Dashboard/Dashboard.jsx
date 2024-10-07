import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Box,
  Avatar,
} from '@mui/material';
import { MoreVert, Logout, Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { getUsers, deleteUser, updateUser } from '../../services/userService';
import EditUserModal from '../../Components/Modal/editUserModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user?.role]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setSnackbar({ open: true, message: 'Failed to fetch users', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
    }
    handleMenuClose();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  const handleUpdate = async (id, updatedUserData) => {
    try {
      await updateUser(id, updatedUserData);
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbar({ open: true, message: 'Failed to update user', severity: 'error' });
    }
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Welcome, {user?.username}! Your role is: {user?.role}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={logout}
        startIcon={<Logout />}
        sx={{ mb: 3 }}
      >
        Logout
      </Button>

      {user?.role === 'admin' && (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.userId}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {user.username[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" component="div">
                      {user.username}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Role: {user.role}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={(event) => handleMenuClick(event, user)}>
                    <MoreVert />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(selectedUser)}>
          <Edit fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedUser.userId)}>
          <Delete fontSize="small" /> Delete
        </MenuItem>
      </Menu>

      <EditUserModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        handleUpdate={handleUpdate}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
