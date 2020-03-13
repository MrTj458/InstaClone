from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework.pagination import PageNumberPagination

from .models import Post
from .serializers import PostSerializer
from .permissions import PostsPermissions


class PostsViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [PostsPermissions]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        """Make sure the post is attached to the authorized user"""
        post = serializer.save(author=self.request.user)
        post.likes.add(self.request.user)
        return post
