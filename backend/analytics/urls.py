
from django.urls import path
from .views import SummaryStatsView, ExportTransactionsCSV

urlpatterns = [
    path('summary/', SummaryStatsView.as_view(), name='admin_summary'),
    path('export/csv/', ExportTransactionsCSV.as_view(), name='export_csv'),
]
