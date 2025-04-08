
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bet, GroupBet, BetHistory
from .serializers import BetSerializer, GroupBetSerializer, BetHistorySerializer

class CreateBetView(generics.CreateAPIView):
    serializer_class = BetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class ListBetsView(generics.ListAPIView):
    serializer_class = BetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bet.objects.filter(creator=self.request.user) | Bet.objects.filter(opponent=self.request.user)

class CreateGroupBetView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, bet_id):
        bet = Bet.objects.get(id=bet_id, is_group_bet=True)
        group_bet, created = GroupBet.objects.get_or_create(bet=bet)
        group_bet.participants.add(request.user)
        return Response({"message": "Joined group bet"})

class BetHistoryView(generics.ListAPIView):
    serializer_class = BetHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BetHistory.objects.filter(user=self.request.user)
