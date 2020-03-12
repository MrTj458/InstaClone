from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

router = DefaultRouter()

router.register('', views.AuthApi, basename='auth')

urlpatterns = [
    path('auth/', include(router.urls)),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
