import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const EditUserModal = ({ open, handleClose, user, handleUpdate }) => {
  const [editedUser, setEditedUser] = useState({ username: '', role: '' });

  useEffect(() => {
    if (user) {
      setEditedUser({ username: user.username, role: user.role });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    handleUpdate(user.userId, editedUser);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={editedUser.username}
          onChange={handleChange}
        />
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;