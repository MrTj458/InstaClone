from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from posts import views as post_views

router = DefaultRouter()

# Core
router.register('auth', views.AuthViewSet, basename='auth')
router.register('users', views.UserViewSet, basename='users')

# Posts
router.register('posts', post_views.PostsViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
