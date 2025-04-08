
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer

class CreateTransactionView(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionHistoryView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)


import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from payments.models import Transaction

stripe.api_key = 'sk_test_placeholder'  # Replace with your Stripe Secret Key

class CreateCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = int(float(request.data.get('amount')) * 100)  # convert to cents
        method = request.data.get('method')

        session = stripe.checkout.Session.create(
            payment_method_types=['card', 'paypal', 'venmo'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f'MY WAGER Deposit - {method}'
                    },
                    'unit_amount': amount,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
            metadata={
                'user_id': request.user.id,
                'method': method,
                'amount': amount / 100
            }
        )

        # Save as pending transaction
        Transaction.objects.create(
            user=request.user,
            amount=amount / 100,
            method=method,
            status='pending'
        )

        return Response({ 'checkout_url': session.url })