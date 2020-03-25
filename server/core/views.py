from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer, LoginSerializer
from .permissions import UserViewPermissions

from posts.models import Post
from posts.serializers import PostSerializer


class UserViewSet(GenericViewSet, RetrieveModelMixin):
    permission_classes = [UserViewPermissions]
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
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


class AuthViewSet(GenericViewSet):
    serializer_class = UserSerializer

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
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
