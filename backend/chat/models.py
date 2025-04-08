
from django.db import models
from django.contrib.auth import get_user_model
from bets.models import GroupBet

User = get_user_model()

class Message(models.Model):
    group_bet = models.ForeignKey(GroupBet, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username}: {self.content[:30]}"
