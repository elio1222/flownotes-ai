from django.urls import path
from . import views

urlpatterns = [
    path('process/', views.get_audio)
]