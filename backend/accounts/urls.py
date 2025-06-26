from django.urls import path
from accounts.views import (
    CustomTokenObtainPairView,
    RegisterView, 
    UserProfileView,
    firebase_login
)

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),

    path('auth/firebase-login/', firebase_login),
]
