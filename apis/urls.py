from django.urls import path
from . import views

urlpatterns = [
    path('process/', views.get_audio),
    path('create/user', views.createUser),
    path('create/note', views.createNote),
    path('read/note', views.readNote),
    path('update/note', views.updateNote),
    path('delete/note', views.deleteNote)
]