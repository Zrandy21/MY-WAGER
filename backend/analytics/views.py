
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from users.models import User
from bets.models import Bet
from payments.models import Transaction
from django.db.models import Sum, Count
import pandas as pd
from django.http import HttpResponse
import io

class SummaryStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_users = User.objects.count()
        total_bets = Bet.objects.count()
        total_revenue = Transaction.objects.filter(status='completed').aggregate(Sum('amount'))['amount__sum'] or 0

        return Response({
            "total_users": total_users,
            "total_bets": total_bets,
            "total_revenue": total_revenue
        })

class ExportTransactionsCSV(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        transactions = Transaction.objects.all().values('user__email', 'amount', 'method', 'status', 'timestamp')
        df = pd.DataFrame(transactions)
        buffer = io.StringIO()
        df.to_csv(buffer, index=False)
        response = HttpResponse(buffer.getvalue(), content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=transactions.csv'
        return response
