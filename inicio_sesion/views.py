
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.contrib.auth.views import LoginView


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('index')  # Redirige a la vista 'index'
            else:
                messages.error(request, "Credenciales incorrectas.")
    else:
        form = AuthenticationForm()

        return render(request, 'inicio_sesion/login.html', {'form': form})


def redirect_to_register(request):
    # Redirige a la vista de registro en la app 'usuarios'
    return redirect('register')


class CustomLoginView(LoginView):
    template_name = 'inicio_sesion/login.html'

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, 'Inicio de sesión exitoso.')
        return response

    def form_invalid(self, form):
        response = super().form_invalid(form)
        messages.error(
            self.request, 'Datos incorrectos. Por favor, intente nuevamente.')
        return response
