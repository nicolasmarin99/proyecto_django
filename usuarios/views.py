from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CustomUserCreationForm


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            # Cambia 'home' por la vista a la que quieras redirigir
            return redirect('index')
    else:
        form = CustomUserCreationForm()
    return render(request, 'usuarios/register.html', {'form': form})
