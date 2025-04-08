
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Bet(models.Model):
    creator = models.ForeignKey(User, related_name='created_bets', on_delete=models.CASCADE)
    opponent = models.ForeignKey(User, related_name='opponent_bets', on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_group_bet = models.BooleanField(default=False)
    is_settled = models.BooleanField(default=False)
    winner = models.ForeignKey(User, related_name='won_bets', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class GroupBet(models.Model):
    bet = models.OneToOneField(Bet, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='group_bets')

class BetHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bet = models.ForeignKey(Bet, on_delete=models.CASCADE)
    outcome = models.CharField(max_length=10)  # "win" or "lose"
    recorded_at = models.DateTimeField(auto_now_add=True)
