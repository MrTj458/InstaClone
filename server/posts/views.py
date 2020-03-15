from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.pagination import PageNumberPagination

from .models import Post
from .serializers import PostSerializer, PostUpdateSerializer
from .permissions import PostsPermissions


class PostsViewSet(ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [PostsPermissions]

    def perform_create(self, serializer):
        """Make sure the post is attached to the authorized user"""
        post = serializer.save(author=self.request.user)
        post.likes.add(self.request.user)
        return post

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return PostUpdateSerializer

        return PostSerializer
