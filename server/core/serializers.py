from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image']
        read_only_fields = ['image']


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'password',
                  'profile', 'num_posts']
        read_only_fields = ['id']
        extra_kwargs = {'password': {'write_only': True,
                                     'min_length': 8, 'style': {'input_type': 'password'}}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(trim_whitespace=False, style={
        'input_type': 'password'})

    def validate(self, attrs):
        user = authenticate(**attrs)

        if not user or not user.is_active:
            raise serializers.ValidationError(
                {'authentication': ['Username or password is incorrect.']})

        return user
