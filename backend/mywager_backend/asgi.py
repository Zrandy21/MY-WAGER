# ASGI application
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mywager_backend.settings')

application = get_asgi_application()
# This file is the entry point for ASGI-compatible web servers to serve your Django application.
# It sets the default settings module and exposes the ASGI application callable.
# ASGI is a specification for Python web servers and applications to communicate with each other.