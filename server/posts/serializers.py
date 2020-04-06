from rest_framework import serializers

from core.serializers import UserSerializer
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Main serializer for posts.
    """
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['likes', 'author', 'created_at']


class PostUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating posts.
    """
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['likes', 'author', 'created_at', 'image']
