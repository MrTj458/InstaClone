from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from PIL import Image


class User(AbstractUser):
    email = models.EmailField(unique=True)

    def num_posts(self):
        return self.post_set.count()


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), models.CASCADE)
    image = models.ImageField(upload_to='avatars', default='default.png')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)

    def __str__(self):
        return f'{self.user.username}\'s Profile'
