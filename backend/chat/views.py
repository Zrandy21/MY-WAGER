
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        group_bet_id = self.kwargs['group_bet_id']
        return Message.objects.filter(group_bet__id=group_bet_id).order_by('timestamp')

    def perform_create(self, serializer):
        group_bet_id = self.kwargs['group_bet_id']
        serializer.save(sender=self.request.user, group_bet_id=group_bet_id)
