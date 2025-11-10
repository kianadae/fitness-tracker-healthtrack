import { Box, Grid, Paper, Typography, Avatar, Card, CardContent, Stack, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ActivityChart } from '../../components/charts/ActivityChart';
import { 
  DirectionsRun as RunIcon, 
  DirectionsBike as BikeIcon, 
  Pool as SwimIcon, 
  SelfImprovement as YogaIcon,
  TrendingUp as TrendingIcon,
  AccessTime as TimeIcon,
  Speed as PaceIcon,
  LocalFireDepartment as CaloriesIcon
} from '@mui/icons-material';

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
  },
}));

interface ActivityItemProps {
  type: string;
  distance: string;
  duration: string;
  date: string;
  calories: string | number;
}

const ActivityItem = ({ type, distance, duration, date, calories }: ActivityItemProps) => {
  const getActivityIcon = () => {
    switch (type.toLowerCase()) {
      case 'running':
        return <RunIcon color="primary" />;
      case 'cycling':
        return <BikeIcon color="primary" />;
      case 'swimming':
        return <SwimIcon color="primary" />;
      default:
        return <YogaIcon color="primary" />;
    }
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ bgcolor: 'primary.light', mr: 2, width: 36, height: 36 }}>
            {getActivityIcon()}
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
              {type}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {date}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color="primary">
            {distance} km
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Box display="flex" alignItems="center" color="text.secondary">
            <TimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="caption">{duration}</Typography>
          </Box>
          <Box display="flex" alignItems="center" color="error.main">
            <CaloriesIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="caption">{calories} cal</Typography>
          </Box>
          <Box display="flex" alignItems="center" color="text.secondary">
            <PaceIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="caption">5:30 /km</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  const stats = [
    { title: 'Total Activities', value: '24', change: '+5%', icon: <TrendingIcon color="primary" /> },
    { title: 'Active Days', value: '18', change: 'of 30 days', icon: <RunIcon color="primary" /> },
    { title: 'Calories Burned', value: '12,450', change: '+8%', icon: <CaloriesIcon color="primary" /> },
    { title: 'Total Distance', value: '156.8 km', change: '+12%', icon: <PaceIcon color="primary" /> },
  ];

  const recentActivities = [
    { id: 1, type: 'Running', distance: '5.2', duration: '28:15', date: 'Today', calories: 420 },
    { id: 2, type: 'Cycling', distance: '15.7', duration: '42:30', date: 'Yesterday', calories: 580 },
    { id: 3, type: 'Swimming', distance: '1.2', duration: '35:10', date: '2 days ago', calories: 320 },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here's your fitness overview
          </Typography>
        </Box>
        <Box>
          {/* Add date range selector or other controls here */}
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => {
          // @ts-expect-error - Grid item props work at runtime in MUI v7
          return <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    {stat.value}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <TrendingIcon 
                      color="primary" 
                      sx={{ 
                        fontSize: 16, 
                        mr: 0.5,
                        transform: stat.change.startsWith('+') ? 'rotate(0deg)' : 'rotate(180deg)',
                        color: stat.change.startsWith('+') ? 'success.main' : 'error.main'
                      }} 
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: stat.change.startsWith('+') ? 'success.main' : 'text.secondary',
                        fontWeight: 500 
                      }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={1}>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.title === 'Active Days' ? (18/30)*100 : 70} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                      }
                    }} 
                  />
                </Box>
              </Stack>
            </StatCard>
          </Grid>;
        })}
        
        {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
        <Grid item xs={12} md={8}>
          <StatCard>
            <ActivityChart />
          </StatCard>
        </Grid>
        
        {/* @ts-expect-error - Grid item props work at runtime in MUI v7 */}
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="h6" color="primary" gutterBottom>
              Recent Activities
            </Typography>
            <Box>
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} {...activity} />
              ))}
            </Box>
          </StatCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
