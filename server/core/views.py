from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer, LoginSerializer


class AuthApi(GenericViewSet):
    def list(self, request):
        """Get the currently authenticated user"""
        if request.user.is_anonymous:
            return Response({'user': {}})

        user = UserSerializer(request.user)
        return Response(user.data)

    def create(self, request):
        """Log in a user"""
        serialized_login = LoginSerializer(data=request.data)
        serialized_login.is_valid(raise_exception=True)
        user = serialized_login.validated_data
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
