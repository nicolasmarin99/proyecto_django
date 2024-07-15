from django.urls import path
from . import views

urlpatterns = [
    path('playstation/', views.playstation, name='playstation'),
]
