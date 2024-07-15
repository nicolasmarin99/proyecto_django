from django.shortcuts import render

# Create your views here.


def playstation(request):
    return render(request, 'playstation/playstation.html')


def juego_detalle(request):
    # Aquí podrías obtener datos del juego desde la base de datos si es necesario
    return render(request, 'playstation/juego.html')
