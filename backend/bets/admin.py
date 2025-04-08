
from django.contrib import admin
from .models import Bet, GroupBet, BetHistory

@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    list_display = ('id', 'creator', 'opponent', 'amount', 'is_group_bet', 'is_settled', 'created_at')
    search_fields = ('creator__email', 'opponent__email')

@admin.register(GroupBet)
class GroupBetAdmin(admin.ModelAdmin):
    list_display = ('id', 'bet')
    filter_horizontal = ('participants',)

@admin.register(BetHistory)
class BetHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'bet', 'outcome', 'recorded_at')
