from rest_framework.serializers import ModelSerializer

from .models import Post, Comment
from core.serializers import UserSerializer


class PostSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['likes']
