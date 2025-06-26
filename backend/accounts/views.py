from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer, UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status


User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()  # Ensure user is saved and has an ID

        refresh = RefreshToken.for_user(user)

        headers = self.get_success_headers(serializer.data)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "mobile_number": user.mobile_number,
            }
        }, status=status.HTTP_201_CREATED, headers=headers)

        return response
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)


# Google Login View

# views.py

from rest_framework.decorators import api_view
from firebase_admin import auth as firebase_auth
from accounts import firebase_config
import jwt
from django.conf import settings

User = get_user_model()

@api_view(['POST'])
def firebase_login(request):
    id_token = request.data.get('idToken')
    if not id_token:
        return Response({'error': 'ID token is required'}, status=400)

    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        email = decoded_token.get('email')
        name = decoded_token.get('name', 'NoName')
        uid = decoded_token.get('uid')

        user, created = User.objects.get_or_create(email=email, defaults={'username': email, 'first_name': name})
        
        # OPTIONAL: issue your own JWT or session
        token = jwt.encode({'user_id': user.id}, settings.SECRET_KEY, algorithm='HS256')

        return Response({'token': token, 'email': user.email, 'name': user.first_name})

    except Exception as e:
        return Response({'error': str(e)}, status=401)
