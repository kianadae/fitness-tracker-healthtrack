from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Activity
from .serializers import ActivitySerializer, UserSerializer, UserRegistrationSerializer
from rest_framework.authtoken.models import Token


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.utils import timezone

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    try:
        print("Login request data:", request.data)  # Debug log
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Username and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        print(f"Attempting to authenticate user: {username}")  # Debug log
        user = authenticate(username=username, password=password)
        print(f"Authentication result: {user}")  # Debug log

        if user is not None:
            try:
                # Update last_login
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])
                
                # Get or create token
                token, created = Token.objects.get_or_create(user=user)
                user_data = UserSerializer(user).data
                
                print(f"Login successful for user: {user.username}")  # Debug log
                return Response({
                    'message': 'Login successful',
                    'token': token.key,
                    'user': user_data
                })
            except Exception as e:
                print(f"Error during token creation or user serialization: {str(e)}")
                return Response(
                    {'error': 'Internal server error during authentication'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        print(f"Unexpected error in login_user: {str(e)}")
        return Response(
            {'error': 'An unexpected error occurred'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response(UserSerializer(request.user).data)


class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Activity.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)