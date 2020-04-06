from rest_framework.permissions import BasePermission


class PostsPermissions(BasePermission):
    """
    Permissions for posts actions.
    """

    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return True

        return not request.user.is_anonymous

    def has_object_permission(self, request, view, obj):
        if view.action in ['update', 'partial_update', 'destroy'] and request.user != obj.author:
            return False

        return True
