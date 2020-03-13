from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('posts', views.PostsViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls)),
]