from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User)
    title = models.CharField(max_length=20)
    text = models.TextField()
