
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages


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
