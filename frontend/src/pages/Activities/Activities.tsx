import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DirectionsRun as RunIcon,
  DirectionsBike as BikeIcon,
  Pool as SwimIcon,
  SelfImprovement as YogaIcon,
  FitnessCenter as GymIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
}));

interface Activity {
  id: number;
  type: string;
  name: string;
  duration: string;
  distance: string;
  calories: number;
  date: string;
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'running',
      name: 'Morning Run',
      duration: '45 min',
      distance: '5.2 km',
      calories: 320,
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'cycling',
      name: 'Evening Ride',
      duration: '60 min',
      distance: '15.0 km',
      calories: 450,
      date: '2024-01-14'
    },
    {
      id: 3,
      type: 'swimming',
      name: 'Pool Session',
      duration: '30 min',
      distance: '1.0 km',
      calories: 280,
      date: '2024-01-13'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    duration: '',
    distance: '',
    calories: '',
    date: ''
  });

  const activityTypes = [
    { value: 'running', label: 'Running', icon: <RunIcon /> },
    { value: 'cycling', label: 'Cycling', icon: <BikeIcon /> },
    { value: 'swimming', label: 'Swimming', icon: <SwimIcon /> },
    { value: 'yoga', label: 'Yoga', icon: <YogaIcon /> },
    { value: 'gym', label: 'Gym', icon: <GymIcon /> }
  ];

  const getActivityIcon = (type: string) => {
    const activity = activityTypes.find(a => a.value === type);
    return activity?.icon || <RunIcon />;
  };

  const handleOpenDialog = (activity?: Activity) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        type: activity.type,
        name: activity.name,
        duration: activity.duration,
        distance: activity.distance,
        calories: activity.calories.toString(),
        date: activity.date
      });
    } else {
      setEditingActivity(null);
      setFormData({
        type: '',
        name: '',
        duration: '',
        distance: '',
        calories: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingActivity(null);
    setFormData({
      type: '',
      name: '',
      duration: '',
      distance: '',
      calories: '',
      date: ''
    });
  };

  const handleSave = () => {
    if (editingActivity) {
      // Update existing activity
      setActivities(activities.map(a =>
        a.id === editingActivity.id
          ? { ...a, ...formData, calories: parseInt(formData.calories) }
          : a
      ));
    } else {
      // Add new activity
      const newActivity: Activity = {
        id: Math.max(...activities.map(a => a.id)) + 1,
        ...formData,
        calories: parseInt(formData.calories)
      };
      setActivities([newActivity, ...activities]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Activities
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and manage your fitness activities
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add Activity
        </Button>
      </Box>

      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getActivityIcon(activity.type)}
                      <Typography sx={{ textTransform: 'capitalize' }}>
                        {activity.type}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.duration}</TableCell>
                  <TableCell>{activity.distance}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${activity.calories} kcal`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(activity)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(activity.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingActivity ? 'Edit Activity' : 'Add New Activity'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={formData.type}
                label="Activity Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {activityTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {type.icon}
                      <Typography>{type.label}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Activity Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Duration (e.g., 45 min)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <TextField
              fullWidth
              label="Distance (e.g., 5.2 km)"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
            />
            <TextField
              fullWidth
              type="number"
              label="Calories"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            />
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingActivity ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Activities;
