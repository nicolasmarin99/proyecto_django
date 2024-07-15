from django.urls import path
from . import views

urlpatterns = [
    path('playstation/', views.playstation, name='playstation'),
    path('juego/', views.juego_detalle, name='juego_detalle'),
]
