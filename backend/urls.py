from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "MY WAGER backend is running ✅"})

urlpatterns = [
    path('', home),  # Optional: Root health check
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('bets/', include('bets.urls')),
    path('chat/', include('chat.urls')),
    path('payments/', include('payments.urls')),
    path('analytics/', include('analytics.urls')),
]
