export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // Add other user properties as needed
}

export interface Activity {
  id: string;
  type: 'running' | 'cycling' | 'swimming' | 'walking' | 'other';
  distance: number; // in kilometers
  duration: number; // in minutes
  date: string;
  calories?: number;
  notes?: string;
  // Add other activity properties as needed
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
  // Add other error properties as needed
}
