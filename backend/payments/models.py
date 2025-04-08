
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

PAYMENT_METHODS = [
    ('venmo', 'Venmo'),
    ('cashapp', 'Cash App'),
    ('applepay', 'Apple Pay'),
    ('paypal', 'PayPal'),
]

TRANSACTION_STATUS = [
    ('pending', 'Pending'),
    ('completed', 'Completed'),
    ('failed', 'Failed'),
]

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=20, choices=TRANSACTION_STATUS, default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.method} - {self.amount} - {self.status}"
