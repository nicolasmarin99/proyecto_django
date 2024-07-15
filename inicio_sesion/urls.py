from django.urls import path
from . import views
from .views import CustomLoginView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    # Asegúrate de tener una URL para la página de registro
    # Esto asume que tienes una vista de registro en otra parte
    path('register/', views.redirect_to_register, name='register_redirect'),
]
