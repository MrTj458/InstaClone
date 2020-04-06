from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from . import models


class ProfileInline(admin.StackedInline):
    """
    Display profile as an inline item.
    """
    model = models.Profile
    can_delete = False
    verbose_name_plural = 'profile'


class UserAdmin(BaseUserAdmin):
    """
    Display User along with their profile.
    """
    inlines = [ProfileInline]


admin.site.register(models.User, UserAdmin)
