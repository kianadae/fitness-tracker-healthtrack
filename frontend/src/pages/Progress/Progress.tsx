// @ts-nocheck
import { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Tabs,
  Tab,
  Avatar,
  Chip,
} from '@mui/material';
import {
  LocalFireDepartment as CaloriesIcon,
  DirectionsRun as RunIcon,
  FitnessCenter as WorkoutIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledPaper = styled(Paper)({
  padding: 24, // theme.spacing(3) = 24px (8 * 3)
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
});

const StatCard = styled(Card)({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
  },
});

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  index: number;
  value: number;
  id?: string;
  'aria-labelledby'?: string;
}

interface StatCardProps {
  id: string;
  label: string;
  value: number;
  goal: number;
  icon: React.ReactNode;
  color: 'primary' | 'error' | 'success' | 'info' | 'warning';
  unit?: string;
}

interface GoalProps {
  id: string;
  name: string;
  progress: number;
  target: number;
  unit: string;
}

interface AchievementProps {
  id: string;
  title: string;
  date: string;
  icon: string;
  color: string;
  description: string;
}

interface WeeklyActivityProps {
  id: string;
  day: string;
  dayFull: string;
  workouts: number;
  calories: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, id, 'aria-labelledby': ariaLabelledBy, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={id || `progress-tabpanel-${index}`}
      aria-labelledby={ariaLabelledBy || `progress-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const Progress = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const weeklyStats = useMemo<StatCardProps[]>(() => [
    { id: 'total-workouts', label: 'Total Workouts', value: 12, goal: 15, icon: <WorkoutIcon />, color: 'primary' },
    { id: 'calories-burned', label: 'Calories Burned', value: 2850, goal: 3500, icon: <CaloriesIcon />, color: 'error' },
    { id: 'active-minutes', label: 'Active Minutes', value: 480, goal: 600, icon: <TimerIcon />, color: 'success' },
    { id: 'distance', label: 'Distance', value: 42.5, goal: 50, unit: 'km', icon: <RunIcon />, color: 'info' },
  ], []);

  const monthlyGoals = useMemo<GoalProps[]>(() => [
    { id: 'run-100km', name: 'Run 100km', progress: 68, target: 100, unit: 'km' },
    { id: 'burn-calories', name: 'Burn 15,000 calories', progress: 11250, target: 15000, unit: 'kcal' },
    { id: 'complete-workouts', name: 'Complete 50 workouts', progress: 38, target: 50, unit: 'workouts' },
    { id: 'active-days', name: 'Active 20 days', progress: 16, target: 20, unit: 'days' },
  ], []);

  const weeklyActivity = useMemo<WeeklyActivityProps[]>(() => [
    { id: 'mon', day: 'Mon', dayFull: 'Monday', workouts: 2, calories: 450 },
    { id: 'tue', day: 'Tue', dayFull: 'Tuesday', workouts: 1, calories: 320 },
    { id: 'wed', day: 'Wed', dayFull: 'Wednesday', workouts: 2, calories: 520 },
    { id: 'thu', day: 'Thu', dayFull: 'Thursday', workouts: 1, calories: 280 },
    { id: 'fri', day: 'Fri', dayFull: 'Friday', workouts: 2, calories: 480 },
    { id: 'sat', day: 'Sat', dayFull: 'Saturday', workouts: 3, calories: 680 },
    { id: 'sun', day: 'Sun', dayFull: 'Sunday', workouts: 1, calories: 120 },
  ], []);

  const achievements = useMemo<AchievementProps[]>(() => [
    { id: '100km-runner', title: '100km Runner', date: '2024-01-10', icon: '🏃', color: '#4CAF50', description: 'Achieved 100km total running distance' },
    { id: 'consistency-king', title: 'Consistency King', date: '2024-01-05', icon: '👑', color: '#FF9800', description: 'Maintained a 30-day workout streak' },
    { id: 'calorie-crusher', title: 'Calorie Crusher', date: '2023-12-28', icon: '🔥', color: '#F44336', description: 'Burned 50,000 total calories' },
    { id: 'early-bird', title: 'Early Bird', date: '2023-12-20', icon: '🌅', color: '#2196F3', description: 'Completed 20 morning workouts before 7 AM' },
  ], []);

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Progress
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your fitness journey and achievements
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Progress navigation tabs" variant="fullWidth">
          <Tab id="overview-tab" aria-controls="overview-tabpanel" label="Overview" />
          <Tab id="goals-tab" aria-controls="goals-tabpanel" label="Goals" />
          <Tab id="achievements-tab" aria-controls="achievements-tabpanel" label="Achievements" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0} id="overview-tabpanel" aria-labelledby="overview-tab">
        <Typography variant="h6" gutterBottom fontWeight={600}>This Week</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {weeklyStats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.id}>
              <StatCard>
                <CardContent>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                      <Avatar sx={{ bgcolor: `${stat.color}.light`, width: 40, height: 40 }}>{stat.icon}</Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={600}>{stat.value}{stat.unit || ''}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        of {stat.goal}{stat.unit || ''} goal
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(stat.value / stat.goal) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${stat.color}.light`,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: `${stat.color}.main`,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Stack>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        <StyledPaper>
          <Typography variant="h6" gutterBottom fontWeight={600}>Weekly Activity</Typography>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {weeklyActivity.map((day) => (
              <Grid item xs key={day.id}>
                <Box textAlign="center">
                  <Box sx={{ height: 150, mb: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: `${(day.workouts / 3) * 100}%`,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        minHeight: 20,
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">{day.day}</Typography>
                  <Typography variant="body2" fontWeight={600}>{day.workouts}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </TabPanel>

      {/* Goals Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom fontWeight={600}>Monthly Goals</Typography>
        <Stack spacing={3}>
          {monthlyGoals.map((goal) => (
            <StyledPaper key={goal.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={600}>{goal.name}</Typography>
                <Chip
                  label={`${Math.round((goal.progress / goal.target) * 100)}%`}
                  size="small"
                  color={goal.progress >= goal.target ? 'success' : 'default'}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <LinearProgress
                  variant="determinate"
                  value={(goal.progress / goal.target) * 100}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': { borderRadius: 4 },
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                  {goal.progress} / {goal.target} {goal.unit}
                </Typography>
              </Box>
            </StyledPaper>
          ))}
        </Stack>
      </TabPanel>

      {/* Achievements Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom fontWeight={600}>Recent Achievements</Typography>
        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={3} key={achievement.id}>
              <StatCard>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: achievement.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                      }}
                    >
                      {achievement.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>{achievement.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Achieved on {new Date(achievement.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Progress;
