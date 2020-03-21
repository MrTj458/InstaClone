from rest_framework.permissions import BasePermission


class UserViewPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create']:
            """Allow anyone to create an account"""
            return True

        if view.action in ['destroy', 'retrieve']:
            """Only authorized users can delete their account"""
            return not request.user.is_anonymous
