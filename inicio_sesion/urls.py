from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    # Asegúrate de tener una URL para la página de registro
    # Esto asume que tienes una vista de registro en otra parte
    path('register/', views.redirect_to_register, name='register_redirect'),
]
