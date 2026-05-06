from django.contrib import admin

from company.models import PaymentTransaction


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ("customer_name", "method", "amount", "currency", "status", "provider_reference", "created_at")
    list_filter = ("method", "status", "currency", "created_at")
    search_fields = ("customer_name", "email", "phone", "provider_reference", "notes")
    readonly_fields = ("created_at", "updated_at")
