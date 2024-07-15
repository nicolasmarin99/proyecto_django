from django.shortcuts import render

# Create your views here.


def playstation(request):
    return render(request, 'playstation/playstation.html')
