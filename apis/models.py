from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # if the user is deleted all their notes get deleted as well
    title = models.CharField(max_length=20)
    text = models.TextField()
