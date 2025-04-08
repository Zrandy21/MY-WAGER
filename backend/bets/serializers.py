
from rest_framework import serializers
from .models import Bet, GroupBet, BetHistory

class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = '__all__'
        read_only_fields = ('creator', 'is_settled', 'winner', 'created_at')

class GroupBetSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupBet
        fields = '__all__'

class BetHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BetHistory
        fields = '__all__'
