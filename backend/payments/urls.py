
from django.urls import path
from .views import CreateTransactionView, TransactionHistoryView

urlpatterns = [
    path('create/', CreateTransactionView.as_view(), name='create_transaction'),
    path('history/', TransactionHistoryView.as_view(), name='transaction_history'),
]


from django.urls import path
from .views import CreateCheckoutSession

urlpatterns += [
    path('stripe/checkout/', CreateCheckoutSession.as_view(), name='stripe_checkout'),
]