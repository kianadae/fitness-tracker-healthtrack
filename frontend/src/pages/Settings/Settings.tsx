import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    workoutReminders: true,
    goalReminders: false,
    // Privacy
    profileVisibility: 'public',
    activitySharing: true,
    // Preferences
    theme: 'light',
    language: 'en',
    units: 'metric',
    startOfWeek: 'monday',
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handlePasswordChange = () => {
    // Implement password change logic
    console.log('Changing password...');
    setOpenPasswordDialog(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log('Deleting account...');
    setOpenDeleteDialog(false);
    logout();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Manage your app preferences and account settings
      </Typography>

      {/* Notifications */}
      <StyledPaper>
        <SectionTitle variant="h6">
          <NotificationsIcon />
          Notifications
        </SectionTitle>
        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
            }
            label="Push Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.workoutReminders}
                onChange={(e) => handleSettingChange('workoutReminders', e.target.checked)}
              />
            }
            label="Workout Reminders"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.goalReminders}
                onChange={(e) => handleSettingChange('goalReminders', e.target.checked)}
              />
            }
            label="Goal Reminders"
          />
        </Stack>
      </StyledPaper>

      {/* Privacy & Security */}
      <StyledPaper>
        <SectionTitle variant="h6">
          <SecurityIcon />
          Privacy & Security
        </SectionTitle>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Profile Visibility</InputLabel>
            <Select
              value={settings.profileVisibility}
              label="Profile Visibility"
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="friends">Friends Only</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={settings.activitySharing}
                onChange={(e) => handleSettingChange('activitySharing', e.target.checked)}
              />
            }
            label="Allow Activity Sharing"
          />
          <Button
            variant="outlined"
            onClick={() => setOpenPasswordDialog(true)}
            sx={{ alignSelf: 'flex-start', borderRadius: 2 }}
          >
            Change Password
          </Button>
        </Stack>
      </StyledPaper>

      {/* Preferences */}
      <StyledPaper>
        <SectionTitle variant="h6">
          <PaletteIcon />
          Preferences
        </SectionTitle>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Theme</InputLabel>
            <Select
              value={settings.theme}
              label="Theme"
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="auto">Auto</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              value={settings.language}
              label="Language"
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Units</InputLabel>
            <Select
              value={settings.units}
              label="Units"
              onChange={(e) => handleSettingChange('units', e.target.value)}
            >
              <MenuItem value="metric">Metric (km, kg)</MenuItem>
              <MenuItem value="imperial">Imperial (mi, lb)</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Start of Week</InputLabel>
            <Select
              value={settings.startOfWeek}
              label="Start of Week"
              onChange={(e) => handleSettingChange('startOfWeek', e.target.value)}
            >
              <MenuItem value="monday">Monday</MenuItem>
              <MenuItem value="sunday">Sunday</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </StyledPaper>

      {/* Data & Storage */}
      <StyledPaper>
        <SectionTitle variant="h6">
          <StorageIcon />
          Data & Storage
        </SectionTitle>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Total data used: 245 MB
            </Typography>
            <Button variant="outlined" sx={{ mt: 1, borderRadius: 2 }}>
              Clear Cache
            </Button>
          </Box>
          <Divider />
          <Box>
            <Button variant="outlined" sx={{ borderRadius: 2, mr: 2 }}>
              Export Data
            </Button>
            <Button variant="outlined" color="warning" sx={{ borderRadius: 2 }}>
              Backup Data
            </Button>
          </Box>
        </Stack>
      </StyledPaper>

      {/* About */}
      <StyledPaper>
        <SectionTitle variant="h6">
          <InfoIcon />
          About
        </SectionTitle>
        <List>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help & Support" secondary="Get help with the app" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" secondary="Version 1.0.0" />
          </ListItem>
        </List>
      </StyledPaper>

      {/* Danger Zone */}
      <StyledPaper sx={{ borderColor: 'error.main', borderWidth: 1, borderStyle: 'solid' }}>
        <Typography variant="h6" color="error" gutterBottom fontWeight={600}>
          Danger Zone
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          These actions are irreversible. Please be certain before proceeding.
        </Alert>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 2 }}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ borderRadius: 2 }}
          >
            Delete Account
          </Button>
        </Stack>
      </StyledPaper>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone. All your data will be permanently deleted.
          </Alert>
          <Typography variant="body2">
            Are you sure you want to delete your account? Type <strong>DELETE</strong> to confirm.
          </Typography>
          <TextField fullWidth sx={{ mt: 2 }} placeholder="Type DELETE" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
