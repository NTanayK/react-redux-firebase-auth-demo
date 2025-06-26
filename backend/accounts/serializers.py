from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q
from rest_framework import serializers

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'username'

    def validate(self, attrs):
        credentials = {
            'username': attrs.get('username'),
            'password': attrs.get('password')
        }

        user = User.objects.filter(
            Q(username=credentials['username']) |
            Q(email=credentials['username']) |
            Q(mobile_number=credentials['username'])
        ).first()

        if user is None or not user.check_password(credentials['password']):
            raise serializers.ValidationError("Invalid credentials")

        data = super().validate({'username': user.username, 'password': credentials['password']})
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'mobile_number': user.mobile_number,
            'is_admin': user.is_staff 
        }

        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'mobile_number', 'password']

    # Hashing passwords securely using PBKDF2.

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            mobile_number=validated_data['mobile_number'],
            password=validated_data['password']
        )
        return user
    

class UserProfileSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'mobile_number', 'is_admin']

    def get_is_admin(self, obj):
        return obj.is_staff
