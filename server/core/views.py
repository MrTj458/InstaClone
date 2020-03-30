from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer, LoginSerializer
from .permissions import UserViewPermissions


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    """
    User retrieve, create and delete.

    Retrieve users by username instead of id ex: ```/api/users/username-here```

    Search for users by username with ```/api/users/?search=search-term-here```
    """
    permission_classes = [UserViewPermissions]
    serializer_class = UserSerializer
    lookup_field = 'username'

    def create(self, request):
        """Register a new user"""
        serialized_user = UserSerializer(
            data=request.data, context={'request': request})
        serialized_user.is_valid(raise_exception=True)
        user = serialized_user.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': serialized_user.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

    def destroy(self, request, pk=None):
        """Deactivate user account"""
        user = request.user
        user.is_active = False
        user.save()
        return Response(None, status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        if self.action in ['list']:
            term = self.request.query_params.get('search')
            if term:
                return get_user_model().objects.filter(username__contains=term)
            raise NotFound(
                detail='A search query must be provided.')
        return get_user_model().objects.all()


class AuthViewSet(GenericViewSet):
    """
    Login a user or get the currently authorized user.

    Token headers should be sent as ```{'Authorization': 'Bearer tokenGoesHere'}```

    To refresh access token, send a post request to ```/api/auth/refresh/```
    """

    def list(self, request):
        """Get the currently authenticated user"""
        if request.user.is_anonymous:
            return Response({})

        user = UserSerializer(request.user, context={'request': request})
        return Response(user.data)

    def create(self, request):
        """Log in a user"""
        serialized_login = LoginSerializer(
            data=request.data, context={'request': request})
        serialized_login.is_valid(raise_exception=True)
        user = serialized_login.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user, context={'request': request}).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

    def get_serializer_class(self):
        if self.action in ['create']:
            return LoginSerializer
        return UserSerializer
