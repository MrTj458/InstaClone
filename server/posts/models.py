from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(get_user_model(), models.CASCADE)
    image = models.ImageField(upload_to='posts')
    created_at = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True)
    likes = models.ManyToManyField(get_user_model(), related_name='likes')


class Comment(models.Model):
    post = models.ForeignKey(Post, models.CASCADE, related_name='comments')
    author = models.ForeignKey(
        get_user_model(), models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
