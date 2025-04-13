# Project URL config
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('bets/', include('bets.urls')),
    path('payments/', include('payments.urls')),
    path('chat/', include('chat.urls')),
    path('analytics/', include('analytics.urls')),
]
# This file defines the URL patterns for the Django project.