
from django.urls import path
from .views import MessageListCreateView

urlpatterns = [
    path('<int:group_bet_id>/messages/', MessageListCreateView.as_view(), name='group_chat'),
]
