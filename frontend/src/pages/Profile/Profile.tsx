import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Stack,
  Divider,
  Card,
  CardContent,
  IconButton,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocalFireDepartment as CaloriesIcon,
  DirectionsRun as RunIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
}));

const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  height: '100%',
}));

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 234 567 8900',
    age: '28',
    weight: '75',
    height: '180',
    goal: 'Lose weight and build muscle'
  });

  const stats = [
    { label: 'Total Workouts', value: '248', icon: <RunIcon />, color: 'primary' },
    { label: 'Calories Burned', value: '125,430', icon: <CaloriesIcon />, color: 'error' },
    { label: 'Active Hours', value: '1,234', icon: <TimerIcon />, color: 'success' },
    { label: 'Achievements', value: '42', icon: <TrophyIcon />, color: 'warning' },
  ];

  const recentActivities = [
    { name: 'Morning Run', type: 'Running', date: '2024-01-15', duration: '45 min' },
    { name: 'Gym Session', type: 'Strength', date: '2024-01-14', duration: '60 min' },
    { name: 'Evening Cycle', type: 'Cycling', date: '2024-01-13', duration: '30 min' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setProfileData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john@example.com',
      phone: '+1 234 567 8900',
      age: '28',
      weight: '75',
      height: '180',
      goal: 'Lose weight and build muscle'
    });
    setIsEditing(false);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
        Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Manage your personal information and fitness goals
      </Typography>

      {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
      <Grid container spacing={3}>
        {/* Profile Information */}
        {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                Personal Information
              </Typography>
              {!isEditing ? (
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  >
                    Cancel
                  </Button>
                </Stack>
              )}
            </Box>

            <Box display="flex" alignItems="center" mb={4}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: '2.5rem',
                    bgcolor: 'primary.main'
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                {isEditing && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                      boxShadow: 2,
                      '&:hover': { bgcolor: 'background.paper' }
                    }}
                    size="small"
                  >
                    <PhotoCameraIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Box ml={3}>
                <Typography variant="h5" fontWeight={600}>
                  {profileData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since Jan 2024
                </Typography>
                <Chip label="Pro Member" size="small" color="primary" sx={{ mt: 1 }} />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </Grid>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  type="email"
                />
              </Grid>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </Grid>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  disabled={!isEditing}
                  type="number"
                />
              </Grid>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  value={profileData.weight}
                  onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                  disabled={!isEditing}
                  type="number"
                />
              </Grid>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  value={profileData.height}
                  onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                  disabled={!isEditing}
                  type="number"
                />
              </Grid>
              {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fitness Goal"
                  value={profileData.goal}
                  onChange={(e) => setProfileData({ ...profileData, goal: e.target.value })}
                  disabled={!isEditing}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Sidebar */}
        {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Stats */}
            <StyledPaper>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Statistics
              </Typography>
              <Stack spacing={2} mt={2}>
                {stats.map((stat, index) => (
                  <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ bgcolor: `${stat.color}.light`, width: 36, height: 36 }}>
                        {stat.icon}
                      </Avatar>
                      <Typography variant="body2">{stat.label}</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </StyledPaper>

            {/* Recent Activities */}
            <StyledPaper>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activities
              </Typography>
              <Stack spacing={2} mt={2}>
                {recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <Typography variant="body2" fontWeight={600}>
                      {activity.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.type} • {activity.duration}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {new Date(activity.date).toLocaleDateString()}
                    </Typography>
                    {index < recentActivities.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </StyledPaper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
