
from django.urls import path
from .views import CreateBetView, ListBetsView, CreateGroupBetView, BetHistoryView

urlpatterns = [
    path('create/', CreateBetView.as_view(), name='create_bet'),
    path('list/', ListBetsView.as_view(), name='list_bets'),
    path('group/<int:bet_id>/join/', CreateGroupBetView.as_view(), name='join_group_bet'),
    path('history/', BetHistoryView.as_view(), name='bet_history'),
]
