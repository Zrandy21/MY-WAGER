
from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'method', 'status', 'timestamp')
    search_fields = ('user__email',)
    list_filter = ('status', 'method')
