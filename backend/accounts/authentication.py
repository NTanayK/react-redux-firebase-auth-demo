from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

UserModel = get_user_model()

class MultiFieldModelBackend(ModelBackend):
    """
    Custom auth backend that allows login with username, email, or mobile_number.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserModel.objects.get(
                Q(username=username) | Q(email=username) | Q(mobile_number=username)
            )
        except UserModel.DoesNotExist:
            return None
        
        if user.check_password(password):
            return user
        return None
